const { create, getProjects, loginUser, updateProjectStatus, getChartsTotal, getChartsClosed, getCounts, getSearchedResults, getDropdownData, getChartsData, getClosureDelay } = require("./service");
let chartsObj;
let totalProjects;

let reason, type, division, category, priority, department, location;
const { sign } = require('jsonwebtoken');

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
            console.log("user login result :", results[0]);
            if (!results[0]) {
                return res.json({
                    success: false,
                    message: "invalid credentials"
                });
            }

            if (results[0]) {
                results[0].upass = undefined; // to avoid sharing password in jsonwebtoken
                const jsontoken = sign({ result: results[0] }, "qwe1234", {
                    expiresIn: "1h"
                });

                return res.json(
                    {
                        success: true,
                        message: "login successfully",
                        token: jsontoken
                    }
                );
            }


            // return res.json(
            //     {
            //         success: true,
            //         message: "login successfully"
            //     }
            // );
        });
    },
    getProjects: (req, res) => {
        const { sort, offsetValue } = req.params;
        const offset = parseInt(offsetValue, 10);
        //  console.log("sort", sort);
        //  console.log("offset", offset);

        getProjects(sort, offset, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            // return res.json({
            //     success: true,
            //     data: results
            // });

            return res.json({
                result: results,
                //  pageCount:Math.ceil((results.length)/10)   
                pageCount: 5
            });
        })
    },

    getSearchedResults: (req, res) => {
        const { text, sort } = req.params;
        // adding % here for pattern matching in sql query
        let textInput = text + "%";

        // console.log("text", text);
        // console.log("sort", sort);
        // console.log("textInput", textInput);

        getSearchedResults(textInput, sort, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            // return res.json({
            //     success: true,
            //     data: results
            // });
            console.log(`showing search results for "${text}"`);
            return res.json({
                result: results,
                //  pageCount:Math.ceil((results.length)/10)   
                pageCount: 5
            });
        })
    },
    updateProjectStatus: (req, res) => {
        const body = req.body;// body={id:intValue,proname:"proname"}
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
            console.log(`status of project "${body.proname}" is changed`);
            return res.json({
                success: true,
                message: "project status updated successfully"
            });
        });
    },
    getChartsData: (req, res) => {
        // getChartsTotal((err, results) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     //  totalProjects=results;

        //     chartsObj = {
        //         chartsTotal: results,//this should be array of values
        //         chartsClosed: null,
        //     }

        //     // return res.json(results);

        // });

        // getChartsClosed((err, results) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     chartsObj = {
        //         ...chartsObj,//this should be array of values
        //         chartsClosed: results,//this should be array of values
        //     }

        //     let arr1 = chartsObj.chartsTotal
        //         .filter(Array.isArray)
        //         .map(subArr => subArr[0].chartsTotal);

        //     let arr2 = chartsObj.chartsClosed
        //         .filter(Array.isArray)
        //         .map(subArr => subArr[0].chartsClosed);

        //     let resultObj = {
        //         chartsTotal: arr1,
        //         chartsClosed: arr2
        //     } // return json object if this does not work 

        //     console.log(resultObj);
        //     return res.json(resultObj);//it should be object having chartsTotal,chartsClosed keys containing array of values 

        // });


        getChartsData((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            //  console.log(results);// this is array having objects for each dept, keys are chartsClosed and chartsTotal


            const arr1 = results.map(item => item.chartsTotal);
            const arr2 = results.map(item => item.chartsClosed);

            console.log('chartsTotal:', arr1);
            console.log('chartsClosed:', arr2);


            let resultObj = {
                chartsTotal: arr1,//this is array
                chartsClosed: arr2 // this is array
            }

            return res.json(resultObj);

        });
    },

    getCounts: (req, res) => {

        let countsArray;

        // getCounts((err, results) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }


        //     const countsArray = results.slice(0, 5).map(item => {
        //         return Object.values(item[0])[0];
        //     });

        //     console.log(countsArray);
        //     return res.json(countsArray);
        //     // return res.json(results);
        // });

        getCounts((err, results) => {
            if (err) {
                console.log(err);
                return;
            }


            // const countsArray = results.slice(0, 4).map(item => {
            //     return Object.values(item[0])[0];
            // });

             countsArray = Object.values(results[0]);

            console.log(countsArray);// array of all counts except closure delay
        });

        getClosureDelay((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results[0].closure);// to get value of closure delay
            countsArray.push(results[0].closure);// pushing closure delay into array of counts
            console.log(countsArray);
            return res.json(countsArray);// array of all counts with closure delay

        });

    },
    getDropdownData: (req, res) => {

        getDropdownData((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            let dropdownObj = {
                reason: results[0],
                type: results[1],
                division: results[2],
                category: results[3],
                priority: results[4],
                department: results[5],
                location: results[6]
            }


            return res.json(dropdownObj);
        });

    }
}