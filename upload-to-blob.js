#!/usr/bin/env node
const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function upload(imagePath) {
  try {
    const file = fs.readFileSync(imagePath);
    const filename = path.basename(imagePath);

    const blob = await put(`social/${filename}`, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true
    });

    console.log(JSON.stringify({ url: blob.url }));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

const imagePath = process.argv[2];
if (!imagePath) {
  console.error(JSON.stringify({ error: 'Image path required' }));
  process.exit(1);
}

upload(imagePath);
