const pool = require("../../config/database");
//you can also create getProjectStatus api to show project status
/*
remaining=>1. counters api, closure delay api, highchart api and others
*/
module.exports = {
    //data will come from controller and callback is a method 
    create: (data, callback) => {//working
        pool.query(
            `insert into projectinfo(proname,prostartdate,proenddate,prid,ptid,pdivid,pcid,ppid,pdid,plid,psid) values(?,?,?,?,?,?,?,?,?,?,?) `,
            // [
            //     data.proname,
            //     data.prostartdate,
            //     data.proenddate,
            //     data.prid,
            //     data.ptid,
            //     data.pdivid,
            //     data.pcid,
            //     data.ppid,
            //     data.pdid,
            //     data.plid,
            //     data.psid
            // ]

            [
                data.theme,
                data.start_date,
                data.end_date,
                parseInt(data.reason, 10),
                parseInt(data.type, 10),
                parseInt(data.division, 10),
                parseInt(data.category, 10),
                parseInt(data.priority, 10),
                parseInt(data.department, 10),
                parseInt(data.location, 10),
                71
            ]
            ,
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);//to call callback method of controller 
            }
        );
    },

    getProjects: callBack => {// working
        pool.query(
            `select p.proname,p.prostartdate,p.proenddate,pr.prname,pt.ptname,pdiv.pdivname,pc.pcname,pp.ppname,pd.pdname,pl.plname,ps.psname
        from projectinfo p join projectreason pr join projecttype pt join projectdivison pdiv join projectcategory pc 
        join projectpriority pp join projectdept pd join projectlocation pl join projectstatus ps
        where p.prid=pr.prid and p.ptid=pt.ptid and p.pdivid=pdiv.pdivid and p.pcid=pc.pcid and p.ppid=pp.ppid
        and p.pdid=pd.pdid and p.plid=pl.plid and p.psid=ps.psid`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    loginUser: (data, callBack) => {//working
        console.log("data", data);
        pool.query(
            `select uemail,upass from userinfo where uemail=? and upass=? `,
            [data.uemail,
            data.upass],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateProjectStatus: (status, callBack) => {//working
        pool.query(
            `update projectinfo set psid=?`,
            [status.data],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getChartsTotal: callBack => {

        pool.query(
            `call findTotalProjects()`,
            [],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);//use for each method for results and pass array of values from here
            }
        )
    },
    getChartsClosed: callBack => {

        pool.query(
            `call findClosedProjects()`,
            [],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);//use for each method for results and pass array of values from here
            }
        )
    },
    getCounts: callBack => {

        pool.query(
            `call findAllCounts()`,
            [],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);//use for each method for results and pass array of values from here
            }
        )
    }
};










