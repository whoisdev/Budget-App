// -----------------------------------------------
//This is a module to control the budget
// -----------------------------------------------
var budgetControl=(function(){
	var Expense= function(id,description,value){
		this.id=id;
		this.description=description;
		this.value=value; 
	};

	var Income=function(id,description,value){
		this.id=id;
		this.description=description;
		this.value=value;

	};

	var data={
		allItems:{
			exp:[],
			inc:[]
		},
		totals:{
			exp:0,
			inc:0
		}
	};
	return{
		addItem: function(type,des,val){
			var newItem;
			if(type==='income'){
				newItem=new Income(data.allItems.inc.length,des,val);
				data.allItems.inc.push(newItem);
			}
			else{
				newItem=new Expense(data.allItems.exp.length,des,val)
				data.allItems.exp.push(newItem);
			}
			return newItem;
		},
		calcuateBudget:function(){
			var expense=data.totals.exp;
		}
	}

})();

// -----------------------------------------------
//This is the User interface module
// -----------------------------------------------
var UIController=(function(){
	return{
		getInput:function(){
			return {
				type:document.querySelector('.add__type').value,
				description:document.querySelector('.add__description').value,
				value:parseFloat(document.querySelector('.add__value').value)
			}
		},
		addListItem:function(obj,type){
			var item_div=document.createElement("DIV");
			item_div.className+="item clearfix"; 

			var description=document.createElement("DIV");
			description.className+="item__description"; 

			var text = document.createTextNode(obj.description);
			description.appendChild(text);

			var clearfix=document.createElement("DIV");
			clearfix.className+="right clearfix";

			var item_value=document.createElement("DIV");
			item_value.className+="item__value";
			text=document.createTextNode(obj.value);

			item_value.appendChild(text);

			var item_delete=document.createElement("DIV");
			item_delete.className+="item__delete";
			
			var button=document.createElement("BUTTON");
			button.className+="item__delete--btn";
			
			var image=document.createElement("I");
			image.className+="ion-ios-close-outline";
			
			button.appendChild(image);
			item_delete.appendChild(button);
			clearfix.appendChild(item_value);
			clearfix.appendChild(item_delete);
			item_div.appendChild(description);
			item_div.appendChild(clearfix);
			if(type=='expense'){
				document.querySelector('.expenses__list').appendChild(item_div);
			}
			else{
				document.querySelector('.income__list').appendChild(item_div);
			}
		},
		clearInput: function(){
			
			document.querySelector('.add__description').value='';
			document.querySelector('.add__value').value='';
			document.querySelector('.add__description').focus();

		},
		updateBudget: function(income,expense){
			document.querySelector('.budget__income--value')=income;
			document.querySelector('.budget__expenses--value')=expense;
		}
	};	
})();

// -----------------------------------------------
//This is the global controll module
// -----------------------------------------------
var controller=(function(bdgcnrl,uicntrl){
	function cntrlAddItem(){
	
		var input=uicntrl.getInput();
		if(input.description && input.value!=NaN && input.value>0){
			var newItem=budgetControl.addItem(input.type,input.description,input.value);
			uicntrl.addListItem(newItem,input.type);
			uicntrl.updateBudget();
		}
		uicntrl.clearInput();
	}
	document.querySelector('.add__btn').addEventListener('click',cntrlAddItem);

	document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13){
    		cntrlAddItem();
   		}	
	});


})(budgetControl,UIController);