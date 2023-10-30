const { query } = require("express");
const pool = require("../../config/database");

module.exports = {
    //data will come from controller and callback is a method 
    create: (data, callback) => {//working
        pool.query(
            `insert into projectinfo(proname,prostartdate,proenddate,prid,ptid,pdivid,pcid,ppid,pdid,plid,psid) values(?,?,?,?,?,?,?,?,?,?,?) `,
            
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
                // returning result returned by callback function of controller
                return callback(null, results);//to call callback function of controller
            }
        );
    },
    getProjects: (sort, offsetValue, callBack) => {// without search text
        let query = `select p.proname,p.prostartdate,p.proenddate,pr.prname,pt.ptname,pdiv.pdivname,pc.pcname,pp.ppname,pd.pdname,pl.plname,ps.psname
        from projectinfo p join projectreason pr join projecttype pt join projectdivison pdiv join projectcategory pc 
        join projectpriority pp join projectdept pd join projectlocation pl join projectstatus ps
        where p.prid=pr.prid and p.ptid=pt.ptid and p.pdivid=pdiv.pdivid and p.pcid=pc.pcid and p.ppid=pp.ppid
        and p.pdid=pd.pdid and p.plid=pl.plid and p.psid=ps.psid order by ${sort} limit 6 offset ${offsetValue}`;

        pool.query(
            query,
            [sort, offsetValue],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //   console.log(query);
                //   console.log("service file object",results);
                return callBack(null, results);
            }
        )
    },
    getSearchedResults: (textInput, sort, callBack) => {
        let query = `select p.proname,p.prostartdate,p.proenddate,pr.prname,pt.ptname,pdiv.pdivname,pc.pcname,pp.ppname,pd.pdname,pl.plname,ps.psname
      from projectinfo p join projectreason pr join projecttype pt join projectdivison pdiv join projectcategory pc 
      join projectpriority pp join projectdept pd join projectlocation pl join projectstatus ps
      where p.prid=pr.prid and p.ptid=pt.ptid and p.pdivid=pdiv.pdivid and p.pcid=pc.pcid and p.ppid=pp.ppid
      and p.pdid=pd.pdid and p.plid=pl.plid and p.psid=ps.psid and p.proname like '${textInput}' order by ${sort}`;

        pool.query(
            query,
            [textInput, sort],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //  console.log(query);
                //   console.log("service file object",results);
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
    updateProjectStatus: (data, callBack) => {
        let query = `update projectinfo set psid=? where proname=?`;
        pool.query(
            query,
            [data.id, data.proname],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
   
    getChartsData: callBack => {

            pool.query(
                `SELECT
                COUNT(CASE WHEN p.psid = 73 THEN 1 ELSE NULL END) AS chartsClosed,
                COUNT(*) AS chartsTotal
            FROM
                projectinfo p
            JOIN
                projectdept pd ON p.pdid = pd.pdid
            WHERE
                pd.pdid BETWEEN 61 AND 66
            GROUP BY
                pd.pdid
            ORDER BY
                pd.pdid;`,
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
            `SELECT COUNT(*) AS total,
            SUM(CASE WHEN psid = 73 THEN 1 ELSE 0 END) AS  closed,
             SUM(CASE WHEN psid = 74 THEN 1 ELSE 0 END) AS cancelled,
                SUM(CASE WHEN psid = 72 THEN 1 ELSE 0 END) AS running FROM projectinfo`,
            [],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );


    },
    getClosureDelay: callBack => {

        pool.query(
            ` select count(*) as closure from projectinfo where datediff(curdate(),proenddate)>'0000-00-01' and psid=72`,
            [],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //for getDropdownData

    getDropdownData: callBack => {
        let query = `call dropdownData()`;

        pool.query(
            query,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
};










