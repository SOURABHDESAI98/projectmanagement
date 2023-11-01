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
    //     let query = `select p.proname,p.prostartdate,p.proenddate,pr.prname,pt.ptname,pdiv.pdivname,pc.pcname,pp.ppname,pd.pdname,pl.plname,ps.psname
    //   from projectinfo p join projectreason pr join projecttype pt join projectdivison pdiv join projectcategory pc 
    //   join projectpriority pp join projectdept pd join projectlocation pl join projectstatus ps
    //   where p.prid=pr.prid and p.ptid=pt.ptid and p.pdivid=pdiv.pdivid and p.pcid=pc.pcid and p.ppid=pp.ppid
    //   and p.pdid=pd.pdid and p.plid=pl.plid and p.psid=ps.psid and p.proname like '${textInput}' order by ${sort}`;

    //     pool.query(
    //         query,
    //         [textInput, sort],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             //  console.log(query);
    //             //   console.log("service file object",results);
    //             return callBack(null, results);
    //         }
    //     )



    // to get searched results for all columns
    let query = `SELECT p.proname, p.prostartdate, p.proenddate, pr.prname, pt.ptname, pdiv.pdivname, pc.pcname, pp.ppname, pd.pdname, pl.plname, ps.psname
    FROM projectinfo p
    JOIN projectreason pr ON p.prid = pr.prid
    JOIN projecttype pt ON p.ptid = pt.ptid
    JOIN projectdivison pdiv ON p.pdivid = pdiv.pdivid
    JOIN projectcategory pc ON p.pcid = pc.pcid
    JOIN projectpriority pp ON p.ppid = pp.ppid
    JOIN projectdept pd ON p.pdid = pd.pdid
    JOIN projectlocation pl ON p.plid = pl.plid
    JOIN projectstatus ps ON p.psid = ps.psid
    WHERE p.proname IN (
        SELECT proname
        FROM projectinfo
        WHERE proname LIKE '${textInput}'
    )
    or p.prid IN (
        SELECT prid
        FROM projectreason
        WHERE prname LIKE '${textInput}'
    )
    or p.ptid IN (
        SELECT ptid
        FROM projecttype
        WHERE ptname LIKE '${textInput}'
    )
    or p.psid IN (
        SELECT psid
        FROM projectstatus
        WHERE psname LIKE '${textInput}'
    )
    or p.pdid IN (
        SELECT pdid
        FROM projectdept
        WHERE pdname LIKE '${textInput}'
    )
    or p.pdivid IN (
        SELECT pdivid
        FROM projectdivison
        WHERE pdivname LIKE '${textInput}'
    )
    or p.plid IN (
        SELECT plid
        FROM projectlocation
        WHERE plname LIKE '${textInput}'
    )
    or p.ppid IN (
        SELECT ppid
        FROM projectpriority
        WHERE ppname LIKE '${textInput}'
    )
    or p.pcid IN (
        SELECT pcid
        FROM projectcategory
        WHERE pcname LIKE '${textInput}'
    ) order by ${sort}`;

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
                    return callBack(null, results);// results is a array of objects, each object having chartsTotal and ChartsClosed keys for each department
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
                return callBack(null, results);// results is array of all counts except closure delay
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










