const { create, getProjects, loginUser, updateProjectStatus, getChartsTotal, getChartsClosed,getCounts } = require("./service");
let chartsObj;
let totalProjects;

module.exports = {
    createProject: (req, res) => { // req comes from axios.post("link",object), this object is req.body
        const body = req.body;
        // calling create function of service.js
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ //to convert into json object
                    success: false,
                    message: "Project is not Added to Database"
                });
            }
            return res.status(200).json({
                success: true,
                message: "New Project Added Successfully"
            });
        });
    },
    loginUser: (req, res) => {
        const body = req.body;
        loginUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("user login result :", results);
            if (!results[0]) {
                return res.json({
                    success: false,
                    message: "invalid credentials"
                });
            }

            return res.json(
                {
                    success: true,
                    message: "login successfully"
                }
            );
        });
    },
    getProjects: (req, res) => {
        getProjects((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                data: results
            });
        })
    },
    updateProjectStatus: (req, res) => {
        const body = req.body;
        updateProjectStatus(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: "failed to update user"
                });
            }
            console.log("results object", results);
            return res.json({
                success: true,
                message: "project status updated successfully"
            });
        });
    },
    getChartsData: (req, res) => {
        getChartsTotal((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            //  totalProjects=results;

            chartsObj = {
                chartsTotal: results,//this should be array of values
                chartsClosed: null,
            }

            // return res.json(results);

        });

        getChartsClosed((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            chartsObj = {
                ...chartsObj,//this should be array of values
                chartsClosed: results,//this should be array of values
            }

            let arr1 = chartsObj.chartsTotal
                .filter(Array.isArray)
                .map(subArr => subArr[0].chartsTotal);

            let arr2 = chartsObj.chartsClosed
                .filter(Array.isArray)
                .map(subArr => subArr[0].chartsClosed);

            let resultObj = {
                chartsTotal: arr1,
                chartsClosed: arr2
            } // return json object if this does not work 

            console.log(resultObj);
            return res.json(resultObj);//it should be object having chartsTotal,chartsClosed keys containing array of values 

        });
    },

    getCounts :(req,res)=>{
        getCounts((err,results)=>{
            if (err) {
                console.log(err);
                return;
            }


            const countsArray = results.slice(0, 5).map(item => {
                return Object.values(item[0])[0];
              });
              
              console.log(countsArray);
              return res.json(countsArray);
           // return res.json(results);
        });
    }
}