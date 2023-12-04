import fs from 'fs';
import path from 'path';


let passcodesPath = 'secrets/passcodes.json';
let passcodes = JSON.parse(fs.readFileSync(passcodesPath, 'utf8'));

export default function handler(req, res) {
  const { passcode } = req.query;

  const passcodeObj = passcodes.find(code => code.value === Number(passcode) && !code.used);
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