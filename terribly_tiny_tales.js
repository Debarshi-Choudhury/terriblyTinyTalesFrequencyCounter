const request=require('request');

var url="http://terriblytinytales.com/test.txt";
var words=[];
var freq=[];

request(url,(err,resp,body)=>{
	if(!err){
		//console.log(body);
		body=body.replace(/\n|,|\?|\(|\)|\/|\t|@|\.|\"|[\\:-]/g,' ');
		words=body.split(' ');
		words=words.filter(function(word){
			return word!=='' && word!=='–';
		});

		var dict={};
		for(var i=0;i<words.length;i++){
			if(dict[words[i]]==null){
				dict[words[i]]=1;
			}else{
				dict[words[i]]++;
			}
		}
		for(var key in dict){
			freq.push([key,dict[key]]);
		}
		freq.sort(function(a,b){
			return b[1]-a[1];
		});
		console.log(JSON.stringify(freq,null,2));	
		console.log(freq.length+" unique words found.");
		
	}
});

module.exports={
	freq
};
