import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || Array.isArray(url)) {
    res.status(400).json({ error: 'Invalid url' });
    return;
  }

  try {
    const result = await getPageAnalysis(url);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze page' });
  }
}

function getPageAnalysis(url: string) {
  return new Promise((resolve, reject) => {
    exec(`python3 scripts/pageAnalysis.py "${url}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}


