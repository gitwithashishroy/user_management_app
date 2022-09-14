
console.log("index js file is loaded");

$("#add_user").submit(function(event){
    console.log("data from jquery");
    alert('data submitted successfully') ; 
});

$("#update_user").submit(function(event){
    event.preventDefault() ; 
    
    var unindexed_array = $(this).serializeArray() ; 
    // console.log(unindexed_array);
    var data = {} 

    $.map(unindexed_array , function(n,l){
        data[n['name']] = n['value'] ;  
    })

    console.log(data);

    var request = {
        "url" : `http://localhost:8000/api/users/${data.id}` , 
        "method" : "put" , 
        "data" : data 
    }

    $.ajax(request).done(function(response){
        alert('data updated successfully !') ; 
    })

})

if(window.location.pathname == "/"){
    $ondelete =$(".table tbody td a.delete ")
    $ondelete.click(function(){
        var id = $(this).attr("data-id")  ;
       
        var request = {
            "url" : `http://localhost:8000/api/users/${id}` , 
            "method" : "delete" 
        }

        if(confirm("Do you really want to delete this record ?")){
            $.ajax(request).done(function(response){
                alert('data deleted successfully !') ; 
                location.reload() ; 
            })
        }

    })
}