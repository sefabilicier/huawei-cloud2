
/* import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import axios from 'axios';  // Data from GitHub API

import { processTerraformFiles } from "./scenarioProcessor.utils.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const terraformDir = path.resolve(__dirname, "..", "..", "terraformFile");

//console.log("subModuleProcessor.utils.js: ", terraformDir)
 
const fetchCommitHashesFromGitHub = async () => {

  try {
    const response = await axios.get('https://api.github.com/repos/zeynepatceken/TerraformFile/commits', {
      headers: {                      
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    console.log("GitHub API Response: ", response.data);  // Log to verify the response
    const commits = response.data;
    const commitHashes = commits.map(commit => commit.sha);
    return commitHashes; 
  } catch (error) {
    console.error('Error fetching commits from GitHub:', error.message); 
    return [];
  }
};


// GitHub'dan commit hash'leri alıp, git komutlarını çalıştıracak fonksiyon
const processCommitUpdates = async () => {
  const commitHashes = await fetchCommitHashesFromGitHub();

  if (commitHashes.length > 0) {
    const latestHash = commitHashes[0];  // Son commit hash'ini alıyoruz

    const terraformPath = path.join(terraformDir, latestHash);

    if (!fs.existsSync(terraformPath)) {
      console.log('New terraform files committed, processing...');

      exec('git fetch --all', (fetchError, fetchStdout, fetchStderr) => { //git fetch <branchName>
        if (fetchError) {
          console.error(`Fetch error: ${fetchError.message}`);
          return;
        }
        console.log(`Fetch stdout: ${fetchStdout}`);
        if (fetchStderr) console.error(`Fetch stderr: ${fetchStderr}`);

        exec(`git checkout ${latestHash}`, (checkoutError, checkoutStdout, checkoutStderr) => {
          if (checkoutError) {
            console.error(`Checkout error: ${checkoutError.message}`);
            return;
          }

          console.log(`Checkout stdout: ${checkoutStdout}`);
          if (checkoutStderr) console.error(`Checkout stderr: ${checkoutStderr}`);

          // Dosyaları işleme
          processTerraformFiles()
            .then(() => {
              console.log('Terraform files processed successfully.');
            })
            .catch(processError => {
              console.error('Error processing terraform files:', processError.message);
            });
        });
      });

    } else {
      console.log('Terraform files up to date.');
      processTerraformFiles();
    }
  } else {
    console.log('No new commits found.');
  }
};


export const checkSubmoduleAndProcess = async () => {
  await processCommitUpdates();  // Commit güncellemelerini kontrol et
}; */















//en son çalıştığımız

/* import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import axios from 'axios'; // Data from GitHub API
import { processTerraformFiles } from "./scenarioProcessor.utils.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const terraformDir = path.resolve(__dirname, "..", "..", "terraformFile");

// GitHub'dan commit hash'leri al
const fetchCommitHashesFromGitHub = async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/zeynepatceken/TerraformFile/commits', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    //console.log("GitHub API Response: ", response.data);  Gelen veriyi kontrol et
    
    const commits = response.data;
    const commitHashes = commits.map(commit => commit.sha);
    console.log('Those are the commit hashes:\n ',commitHashes); 
    
    return commitHashes;
  } catch (error) {
    console.error('Error fetching commits from GitHub:', error.message);
    return [];
  }
};

// Commit hash'leri kontrol et ve işle
const processCommitUpdates = async () => {
  const commitHashes = await fetchCommitHashesFromGitHub();

  if (commitHashes.length > 0) {
    const latestHash = commitHashes[0]; // Son commit hash'ini al
    const terraformPath = path.join(terraformDir, latestHash);

    if (!fs.existsSync(terraformPath)) {
      console.log('New terraform files committed, processing...'); 

      // Fetch tüm dalları indir
      exec('git fetch --all --verbose', (fetchError, fetchStdout, fetchStderr) => {
        if (fetchError) {
          console.error(`Fetch error: ${fetchError.message}`);
          return;
        }
        console.log(`Fetch stdout: ${fetchStdout}`); 
        if (fetchStderr) console.error(`Fetch stderr: ${fetchStderr}`);

        // Commit hash'ini doğrula
        exec(`git rev-parse --verify ${latestHash}`, (verifyError, verifyStdout, verifyStderr) => {
          if (verifyError) {
            console.error(`Invalid commit hash: ${verifyError.message}`); 
            return;
          }
          console.log(`Commit hash is valid: ${verifyStdout.trim()}`);

          // Checkout işlemini gerçekleştir
          exec(`git checkout ${latestHash}`, (checkoutError, checkoutStdout, checkoutStderr) => {
            if (checkoutError) {
              console.error(`Checkout error: ${checkoutError.message}`);
              return;
            }
            console.log(`Checkout stdout: ${checkoutStdout}`);
            if (checkoutStderr) console.error(`Checkout stderr: ${checkoutStderr}`);

            // Terraform dosyalarını işleme
            processTerraformFiles()
              .then(() => {
                console.log('Terraform files processed successfully.');
              })
              .catch(processError => {
                console.error('Error processing terraform files:', processError.message);
              });
          });
        });
      });


      //çalışmadığımız execution
      exec('git fetch --all && git submodule update --init --recursive', (fetchError, fetchStdout, fetchStderr) => {
        if (fetchError) {
          console.error(`Fetch error: ${fetchError.message}`);
          return;
        }
        console.log(`Fetch stdout: ${fetchStdout}`);
        if (fetchStderr) console.error(`Fetch stderr: ${fetchStderr}`);
      
        exec(`git rev-parse --verify ${latestHash}`, (verifyError, verifyStdout, verifyStderr) => {
          if (verifyError) {
            console.error(`Invalid commit hash: ${verifyError.message}`);
            return;
          }
          console.log(`Commit hash is valid: ${verifyStdout.trim()}`);
      
          exec(`git checkout ${latestHash}`, (checkoutError, checkoutStdout, checkoutStderr) => {
            if (checkoutError) {
              console.error(`Checkout error: ${checkoutError.message}`);
              return;
            }
            console.log(`Checkout stdout: ${checkoutStdout}`);
            if (checkoutStderr) console.error(`Checkout stderr: ${checkoutStderr}`);
          });
        });
      });
      

    } else {
      console.log('Terraform files up to date.');
      processTerraformFiles();
    }
  } else {
    console.log('No new commits found.');
  }
};

// Ana işlem fonksiyonu
export const checkSubmoduleAndProcess = async () => {
  await processCommitUpdates(); // Commit güncellemelerini kontrol et
};
 */







/* import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { processTerraformFiles } from "./scenarioProcessor.utils.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const terraformDir = path.resolve(__dirname, "..", "..", "terraformFile");

const fetchCommitHashesFromGitHub = async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/zeynepatceken/TerraformFile/commits', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    const commits = response.data;
    const commitHashes = commits.map((commit) => commit.sha);
    return commitHashes;
  } catch (error) {
    console.error('Error fetching commits from GitHub:', error.message);
    return [];
  }
};

const processSubmoduleAndCommit = async (commitHash) => {
  return new Promise((resolve, reject) => {
    exec(`git submodule update --init --recursive`, (submoduleInitError) => {
      if (submoduleInitError) {
        console.error('Error initializing submodules:', submoduleInitError.message);
        return reject(submoduleInitError);
      }

      console.log('Submodules initialized.');

      // Fetch and checkout submodule to the specific commit
      exec(`git checkout ${commitHash}`, (checkoutError, checkoutStdout, checkoutStderr) => {
        if (checkoutError) {
          console.error(`Checkout error: ${checkoutError.message}`);
          return reject(checkoutError);
        }

        console.log(`Submodule checked out to commit: ${commitHash}`);
        resolve();
      });
    });
  });
};

const processCommitUpdates = async () => {
  const commitHashes = await fetchCommitHashesFromGitHub();
  if (commitHashes.length > 0) {
    const latestHash = commitHashes[0];
    const terraformPath = path.join(terraformDir, latestHash);

    if (!fs.existsSync(terraformPath)) {
      console.log('New terraform files committed, processing...');

      exec('git fetch --all', async (fetchError, fetchStdout, fetchStderr) => {
        if (fetchError) {
          console.error(`Fetch error: ${fetchError.message}`);
          return;
        }
        console.log(`Fetch stdout: ${fetchStdout}`);
        if (fetchStderr) console.error(`Fetch stderr: ${fetchStderr}`);

        try {
          await processSubmoduleAndCommit(latestHash);
          console.log('Submodule updated and checked out successfully.');

          // Dosyaları işleme
          await processTerraformFiles();
          console.log('Terraform files processed successfully.');
        } catch (error) {
          console.error('Error processing submodules or commits:', error.message);
        }
      });
    } else {
      console.log('Terraform files are already up to date.');
      await processTerraformFiles();
    }
  } else {
    console.log('No new commits found.');
  }
};

export const checkSubmoduleAndProcess = async () => {
  await processCommitUpdates();
};
 */


































import { exec } from "child_process";
import fs from "fs";
import path from "path";
import axios from "axios";
import { processTerraformFiles } from "./scenarioProcessor.utils.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const terraformDir = path.resolve(__dirname, "..", "..", "terraformFile");

/**
 * GitHub'dan commit hash'leri alır.
 */
const fetchCommitHashesFromGitHub = async () => {
  try {
    const perPage = 7; 
    const page = 1;

    // GitHub API'ye istek gönder
    const response = await axios.get(
      `https://api.github.com/repos/zeynepatceken/TerraformFile/commits?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // API token ile kimlik doğrulama
        },
      }
    );

    const commits = response.data;
    const commitHashes = commits.map((commit) => commit.sha);
    console.log("Commit hashes fetched from GitHub:\n", commitHashes);
    return commitHashes;
    
  } catch (error) {
    console.error("Error fetching commits from GitHub:", error.message);
    return [];
  }
};

/**
 * GitHub API üzerinden dosyaları indirir.
 */
const downloadFilesFromGitHub = async (commitHash) => {
  try {
    const url = `https://api.github.com/repos/zeynepatceken/TerraformFile/contents?ref=${commitHash}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const files = response.data;

    for (const file of files) {
      if (file.type === "file" && file.download_url) {
        const fileResponse = await axios.get(file.download_url);
        const filePath = path.join(terraformDir, commitHash, file.name);

        // Klasör oluştur (commit hash için)
        if (!fs.existsSync(path.join(terraformDir, commitHash))) {
          fs.mkdirSync(path.join(terraformDir, commitHash), { recursive: true });
        }

        // Dosyayı yaz
        fs.writeFileSync(filePath, fileResponse.data);
        console.log(`Downloaded: ${filePath}`);
      }
    }
  } catch (error) {
    console.error("Error downloading files:", error.message);
  }
};

/**
 * Commit hash'lerini kontrol eder ve işlemleri gerçekleştirir.
 */
const processCommitUpdates = async () => {
  const commitHashes = await fetchCommitHashesFromGitHub();

  if (commitHashes.length > 0) {
    const latestHash = commitHashes[0]; // Son commit hash'i al
    const terraformPath = path.join(terraformDir, latestHash);

    if (!fs.existsSync(terraformPath)) {
      console.log("New terraform files committed, processing...");

      // Dosyaları indir
      await downloadFilesFromGitHub(latestHash);

      // Terraform dosyalarını işle
      await processTerraformFiles();
    } else {
      console.log("Terraform files up to date.");
      await processTerraformFiles();
    }
  } else {
    console.log("No new commits found.");
  }
};

/**
 * Submodule'ü kontrol eder ve işlemleri başlatır.
 */
export const checkSubmoduleAndProcess = async () => {
  await processCommitUpdates();
};

export default {
  checkSubmoduleAndProcess, 
  fetchCommitHashesFromGitHub,
  processCommitUpdates,
};
