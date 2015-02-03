(function($){

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + "$" + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function getQuote( s ) {

    // form used to modify variables
    var f = $( 'form.cf7-self-rater' );
    
    // values from form (f)
    var state, units, tiv;
    state = f.find( "#sr-state" ).val();
    units = parseInt( f.find( "#sr-units" ).val() );
    tiv = Number( f.find( "#sr-tiv" ).val().replace(/[^0-9\.]+/g,"") );
    
    // values for premiums
    var property, p, gl, g, taxes, annual;
    
    // tax rate for all states
    var t = 0.021;

    // set values based on state
    switch ( state ) {
        case "California":
            p = 0.0009075;
            g = 23.161;
            break;
        case "Oregon":
            p = 0.0006853;
            g = 17.4915;
            break;
        case "Washington":
            p = 0.0012815;
            g = 32.729;
            break;
        case "Nevada":
            p = 0.0009075;
            g = 23.161;
            break;
        default:
            p = 0.0012815;
            g = 32.729;
    }

    // calculate premiums and taxes
    property    = tiv * p;
    gl = units * g;
    taxes = ( property + gl ) * t;
    
    // final annual premium
    annual = ( property + gl + taxes ).formatMoney( 2 );
    
    // set value of annual premium field (hidden) to calculated total
    f.find( '.sr-quote' ).val( annual );
    
}

$( 'form.cf7-self-rater' ).find( "input, select" ).change(function(){
    getQuote();
});

})( jQuery );