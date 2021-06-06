(function( $ ){
    $.fn.validate = function(rules) {
         $('._form-error').remove();
         const form = this.serializeArray();
         const data={};
         let isValid = false;
         form.forEach(({name, value})=>data[name] = value);
         const validateData = new ValidateData()
         let result = {};
         for(let key in rules){
             result[key] = []
             for (let rule in rules[key]){
                 const validateResult = validateData[rule]({formName : key, ruleValue : rules[key][rule]})
                 if(validateResult && !result[key][0]){
                     result[key].push(validateResult) 
                 }
             }
         }
         console.log(data)
         function ValidateData(){
             return {
                 min : ({formName, ruleValue})=>{
                     
                     if(data[formName].length < ruleValue){
                         isValid = false;
                         return `Minimal ${ruleValue} karakter`
                     } 
                     isValid = true;
                     return null
                 },
                 max : ({formName, ruleValue})=>{
                    
                     if(data[formName].length > ruleValue){
                         isValid = false;
                         return `Maksimal ${ruleValue} karakter`
                     } 
 
                     isValid = true;
                     return null
                 },
                 required : ({formName, ruleValue})=>{
                     if(!data[formName]){
                         isValid = false;
                         return 'Wajib Diisi'
                     }
                     isValid = true; 
                     return null
                 },
                 match : ({formName, ruleValue})=>{
 
                 },
                 
             }
         }
 
         if(!isValid){
             $(this).showError(result)
         }
         return isValid
     }; 
    $.fn.showError = function(error) {
         for(let key in error){
             if(error[key][0]){
                 // $(`<div class="_form-error"><small class="text-danger">${error[key]}</small></div>`).insertAfter(`[name="${key}"]`)
                 $(`.form-group:has([name="${key}"])`).append(`<div class="_form-error"><small class="text-danger">${error[key][0]}</small></div>`);
             }
         } 
     }; 
    $.fn.setLoading = function(status = true) {
        Swal.fire({
            html : '<h5>Loading... </h5> ',
            allowEscapeKey : false,
            allowOutsideClick : false,
             showConfirmButton : false,
             width : '200px',
        })
 
        if(!status){
            swal.close()
        }
     }; 
 })( jQuery );
 /*
 ==========================
     DOCUMENTATION
 ===========================
 Rules = {
             name : {
                 required : bool | default false,
                 min : int,
                 max : max value,
                 email : bool | default false,
             },
             ...
         }
 
 */