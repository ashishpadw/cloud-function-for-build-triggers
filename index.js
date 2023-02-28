const {google} = require('googleapis');
const cloudbuild = google.cloudbuild('v1');


const BUILD_STATUS = {
  SUCCESS: 0,
  IN_PROCESS: 1,
  FAILURE: 2
}


//const myArray = new Array(20).fill(-1); 
//triggerId :  global.freemiumCloudBuildTrigger
exports.updateArray = async (triggerId, myArray,i) => {
  //const projectId: global.cloudBuildProjectId
  const projectId = process.env.GCP_PROJECT;
  const trigger = `projects/${projectId}/triggers/${triggerId}`;
  const build = {
    "source": {
      "repoSource": {
        "projectId": projectId,
        "repoName": global.freemiumCloudBuildRepoName,
        "branchName": global.freemiumCloudBuildBranchName
        //"repoName": "YOUR_REPOSITORY_NAME",
        //"branchName": "YOUR_BRANCH_NAME"
      }
    }
  };
  
  await cloudbuild.projects.triggers.run({
    projectId,
    triggerId,
    requestBody: {
      source: build.source
    }
  });

  myArray[i]=BUILD_STATUS.SUCCESS;
  console.log(myArray[i]);
};

