/*jshint esversion: 6 */
//this function is called when the web page is loaded
window.onload = function any_function_name()
{
  //this will create four links to display pagination results
  //they are appended onto the id called links*/
for ( var k=10; k>=1; k--) {
  var page3 = document.createElement("a");
  var pagelink = document.createTextNode(k);
  page3.appendChild(pagelink);
  page3.setAttribute('id', k+100);
  page3.title = "link to giphy images";
  page3.href = "index.html?page="+k;
  document.getElementById("links").appendChild(page3);
}


};

//this function is called when the display buttons are pressed index.html
function delete3(url){
//it gets the url associated with the button
     var test1 = url;
//imageDiv2 have any children node they are deleted
     var bye_image = document.getElementById("imageDiv2");
     if (bye_image.hasChildNodes()) {
       for(var j=bye_image.childNodes.length - 1; j >=0 ; j--){

        bye_image.removeChild(bye_image.childNodes[j]);
// It has at least one
   }
}
//if imageDiv2 does not have any children node myFunction is called passing along the button url
  myFunction(test1);

}

//this function is called from delete3
  function myFunction(test){
/*this variable looks at the url what page you are on, so it
can perform pagination and return the correct set of images*/
  var url =window.location.href;
  //this gets the last character of the url
  var lastChar = url[url.length -1];
  /*when the page is called the first time there will be no page number so we
  set it to the default one in order to work*/
  if  (lastChar == "l" ){
    lastChar = 1;
  }
    if  (lastChar == "/" ){
    lastChar = 1;
  }
  //this is to check the var lastChar works
  console.log(lastChar);
  //with the number we have from the url, we will use it determine what image to return
  //in the for loop
    var number = lastChar * 20;
    var offset = "&offset=" + number;

      console.log(offset);
  var full_link = test + offset;

        console.log(full_link);

  $.getJSON(full_link, function(data) {
       for(var i=0; i<20; i++){
         /*this returns the gif files from the giphy api link
         it goes through JSON objects structures to find the images associated with the buttons*/


      var text = `${data.results[i].multimedia.src}`;
      	var link = `${data.results[i].link.url}`;
        	var headline = `${data.results[i].display_title}`;
        /*when we find images we constuct html elements for them so they can they be appended onto
        an existing id*/
        var height = document.getElementById("imageDiv2");
        height.setAttribute('style', "margin-bottom:-400px");//this will help with the footers margins
        var crate_div = document.createElement("Div");
        crate_div.setAttribute('id', i);
        crate_div.setAttribute('style', "float:left padding-bottom: 40px");
        document.getElementById("imageDiv2").appendChild(crate_div);
        var crate_img = document.createElement("IMG");   //this creates the image tag
        crate_img.setAttribute('src',text);  //this is where the giphy gif is stored in the src
         document.getElementById(i).appendChild(crate_img);  //we are appending this data as a child to the element to imageDiv


         //after we have created the image html elements we are going to construct links which you
         //can press to bring you to giphy link of the image you selected
         var a = document.createElement("a");
         var linkText = document.createTextNode("Link");
         a.appendChild(linkText);
         a.title = headline;
         a.href = link;
         document.getElementById(i).appendChild(a);
     }

  });
}
