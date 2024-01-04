import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';


let passcodesPath = 'secrets/passcodes.json';
let passcodes = JSON.parse(fs.readFileSync(passcodesPath, 'utf8'));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { passcode } = req.query;

  interface Passcode {
    value: number;
    used: boolean;
  }

  const passcodeObj = passcodes.find((code: Passcode) => code.value === Number(passcode) && !code.used);

  if (passcodeObj) {
    if (passcodeObj.value !== process.env.OWNER_PASSCODE) { 
        passcodeObj.used = true;
        fs.writeFileSync(passcodesPath, JSON.stringify(passcodes));
    }

    res.status(200).json({ valid: true });
  } else {
    res.status(200).json({ valid: false });
  }
}