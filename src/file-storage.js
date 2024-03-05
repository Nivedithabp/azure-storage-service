const { BlobServiceClient } = require('@azure/storage-blob');

async function getTheImage(accountName, accessKey, imagePath) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(`DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accessKey};EndpointSuffix=core.windows.net`);

  const containerName = "philosophers";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(imagePath);
  
  const properties = await blobClient.getProperties();
  const downloadBlockBlobResponse = await blobClient.download(0);
  // Note: You may need additional logic here to handle the stream or buffer from the download.

  return [ downloadBlockBlobResponse ,properties];
}

module.exports = { getTheImage };
