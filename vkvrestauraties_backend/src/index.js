const express = require('express');
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const cors = require('cors');
const nodemailer = require('nodemailer');

require('dotenv').config();

const morgan = require('morgan');
const logger = require('./logger'); // Import the winston logger

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email provider
    auth: {
        user: 'info@vkvr.nl',
        pass: 'Starnakel1!',
    },
    tls: {
        rejectUnauthorized: false, // Use this line to avoid SSL certificate errors
    },
});

// Initialize the AWS SDK v3 with the correct region (no need to specify the endpoint)
const s3 = new S3Client({
    region: process.env.S3_REGION,  // Use the region from the error message
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your access key
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your secret key
    }
});

const bucketName = process.env.BUCKET_NAME;  // Your S3 bucket name
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const getFilesInFolder = async (folderName) => {
    const params = {
        Bucket: bucketName,
        Prefix: folderName, // Specify the folder name as the prefix
    };

    try {
        const { Contents } = await s3.send(new ListObjectsV2Command(params));
        const images = [];
        let metadata = null;

        Contents.forEach(file => {
            const fileName = file.Key.split('/').pop();
            if (!fileName) return; // Skip folder placeholders
            if (fileName === 'metadata.json') {
                metadata = file; // Identify metadata.json
            } else {
                images.push(file.Key); // Add image file paths
            }
        });

        logger.info(`✔️ Fetched ${images.length} images and metadata for folder ${folderName}`);
        return { images, metadata };
    } catch (error) {
        logger.error(`❌ Error fetching files from S3: ${error.message}`);
        throw new Error(`Error fetching files from S3: ${error.message}`);
    }
};

app.get('/api/folders', async (req, res) => {
    try {
        const params = {
            Bucket: bucketName,
            Delimiter: '/', // Use delimiter to list folders
        };

        const { CommonPrefixes } = await s3.send(new ListObjectsV2Command(params));
        const uniqueFolders = CommonPrefixes.map(prefix => prefix.Prefix.replace(/\/$/, '')); // Remove trailing slashes

        const folderDataPromises = uniqueFolders.map(async (folder) => {
            const { images, metadata } = await getFilesInFolder(folder);

            let metadataContent = null;
            if (metadata) {
                const metadataParams = {
                    Bucket: bucketName,
                    Key: metadata.Key,
                };
                const metadataData = await s3.send(new GetObjectCommand(metadataParams));
                const metadataBuffer = await streamToBuffer(metadataData.Body);
                metadataContent = JSON.parse(metadataBuffer.toString());
            }

            return {
                folder,
                images, // Images already filtered
                metadata: metadataContent,
            };
        });

        const foldersData = await Promise.all(folderDataPromises);
        logger.info('✔️ Fetched all folders from S3');
        res.json({ folders: foldersData });

    } catch (error) {
        logger.error(`❌ Error fetching folders from S3: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'info@vkvr.nl',
        subject: `Contact Form Submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger.error(`❌ Error sending email: ${err.message}`);
            return res.status(500).json({ message: 'Failed to send the email. Please try again later.' });
        }
        logger.info(`✔️ Email sent: ${info.response}`);
        return res.status(200).json({ message: 'Email sent successfully!' });
    });
});

// Helper function to convert a stream to a buffer
const streamToBuffer = (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
};

const PORT = 3000;

logger.info('Project started successfully on port 3000');
app.listen(PORT, () => {
    logger.info(`✔️ Server running on port ${PORT}`);
});
