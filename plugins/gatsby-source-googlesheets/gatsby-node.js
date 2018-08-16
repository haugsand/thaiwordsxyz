const crypto = require("crypto");
const fetch = require("node-fetch");

exports.sourceNodes = ({ actions, createNodeId }, configOptions) => {

    const { createNode } = actions

    const sheetUrl = "https://spreadsheets.google.com/feeds/list/" + configOptions.sheetId + "/od6/public/values?alt=json"; 

    return (

        fetch(sheetUrl)
            .then(response => response.json())
            .then(json => {

                json.feed.entry.map(word => {

                    const fields = {
                        slug: word["gsx$slug"]["$t"],
                        english: word["gsx$english"]["$t"],
                        thai: word["gsx$thai"]["$t"],
                        pronunciation: word["gsx$pronunciation"]["$t"],
                        illustration: word["gsx$illustration"]["$t"],
                        thailanguageid: word["gsx$thailanguageid"]["$t"],
                        category: word["gsx$category"]["$t"],
                    };

                    const nodeId = createNodeId(word["gsx$slug"]["$t"]);
                    const nodeContent = JSON.stringify(fields);
                    const nodeContentDigest = crypto
                        .createHash('md5')
                        .update(nodeContent)
                        .digest('hex')

                    const nodeData = Object.assign({}, fields, {
                      id: nodeId,
                      parent: null,
                      children: [],
                      internal: {
                        type: `EnglishThaiWord`,
                        content: nodeContent,
                        contentDigest: nodeContentDigest,
                      },
                    })


                    createNode(nodeData);

                    

                });

            })

    )

};


