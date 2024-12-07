/* import fs from 'fs';
import path from 'path';

const logTerraformOutput = (scenarioId, userCredentials, terraformOutput) => {
    // Bugünün tarihini alıyoruz (örneğin: "2024-11-25")
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD formatında
    
    // Log klasörünün yolu
    const logDir = path.resolve(__dirname, "..", "logs");

    // Klasörün var olup olmadığını kontrol ediyoruz, yoksa oluşturuyoruz
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Log dosyasının yolu: her gün için ayrı bir dosya oluşturuyoruz
    const logFilePath = path.join(logDir, `${today}.log`);

    // Log girişi oluşturuyoruz
    const logEntry = `Scenario ID: ${scenarioId}\n` +
                     `Access Key: ${userCredentials.accessKey}\n` +
                     `Secret Key: ${userCredentials.secretKey}\n` +
                     `Timestamp: ${new Date().toISOString()}\n` +
                     `Terraform Output: ${JSON.stringify(terraformOutput, null, 2)}\n\n`;

    // Logu dosyaya ekliyoruz
    fs.appendFileSync(logFilePath, logEntry);
};

export default logTerraformOutput; */


import fs from 'fs';
import path from 'path';
import { format } from 'date-fns'; 


const getCurrentDate = () => { //npm install date-fns
    return format(new Date(), 'yyyy-MM-dd');
};


const logTerraformOutput = (scenarioId, credentials, output) => {
    try {
        
        const logDirectory = path.resolve(__dirname, '..', 'logs'); // logs klasörüne yazalım
        const logFileName = `${getCurrentDate()}.log`; // Dosya adını bugünün tarihiyle oluşturuyoruz
        const logFilePath = path.join(logDirectory, logFileName);

        
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        
        const logContent = `Scenario ID: ${scenarioId}\n
                            AccessKey: ${credentials.accessKey}\n
                            SecretKey: ${credentials.secretKey}\n
                            Output: ${JSON.stringify(output, null, 2)}\n\n`;
        
        fs.appendFileSync(logFilePath, logContent);
        
        console.log("successfully logged!");
    } catch (error) {
        console.error("error creating logging:", error.message);
    }
};

export default logTerraformOutput; 
