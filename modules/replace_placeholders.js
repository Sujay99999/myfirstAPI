module.exports = (el, overview_card_html) => {
    let html_op = overview_card_html;
    //console.log(overview_card_html);
    html_op = html_op.replace(/{%PROD_NAME%}/g, el.productName);
    html_op = html_op.replace(/{%PROD_IMAGE%}/g, el.image);
    html_op = html_op.replace(/{%PROD_ID%}/g, el.id);
    html_op = html_op.replace(/{%PROD_FROM%}/g, el.from);
    html_op = html_op.replace(/{%PROD_QUANTITY%}/g, el.quantity);
    html_op = html_op.replace(/{%PROD_NUTRIENTS%}/g, el.nutrients);
    html_op = html_op.replace(/{%PROD_PRICE%}/g, el.price);
    html_op = html_op.replace(/{%PROD_DESCRIPTION%}/g, el.description);
    if(el.organic === false)
    {
        //the text to be replaced is same as the class name
        html_op = html_op.replace(/{%PROD_ORGANIC%}/g, 'not-organic');
    }
    return html_op;
}