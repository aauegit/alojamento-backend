/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
const FIVE_MEGABYTES = 5;
const FILE_SIZE_LIMIT = FIVE_MEGABYTES * 1024 * 1024;

const fileSizeLimiter = (request, response, next) => {
  const files = request.files.file;
  const filesOverLimit = [];

  // Determine which files are over the limit
  files.forEach((file) => {
    if (file.size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(file.name);
    }
  });

  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

    const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file limit of ${FIVE_MEGABYTES} megabytes`;

    const message = filesOverLimit.length < 3 ? sentence.replace(',', ' and') : sentence.replace(/,(?=[^,]*$)/, ' and');

    response.status(413).json({ status: 'error', message });
  }

  next();
};

module.exports = fileSizeLimiter;
