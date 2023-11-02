const dataTable =document.getElementById('dataTable')
const baseUrl='http://localhost:3000/users'

async function fetchData() {
    try {
        const response = await axios.get(baseUrl)
        const data=response.data
        // console.log(response.data);
        addTable(data)
    } catch (error) {
        console.log(error);
    }

}

function addTable(data) {
    dataTable.innerHTML=''
    data.forEach(item => {
        const row=document.createElement('tr')

        row.innerHTML=`
        <td>${item.id}</td>
        <td>${item.description}</td>
        <td>${item.name}</td>
        <td>
            <button onclick="editData(${item.id})">edit</button>
            <button onclick="deleteData(${item.id})">delete</button>
        </td>
        `
        dataTable.append(row)
    });
  
}



async function createData() {
   
    try {
        const descriptionInp = document.getElementById('descriptionInp').value
        const nameInp = document.getElementById('nameInp').value
        await axios.post(baseUrl,{
            description:descriptionInp,
            name:nameInp
        })
        fetchData()
    } catch (error) {
        console.log(error);
    }
    
}

async function deleteData(postId) {
    try {
        await axios.delete(`${baseUrl}/${postId}`)
        fetchData()
    } catch (error) {
        console.log(error);
    }
    
}

let selectedPostId
async function editData(postId) {
    try {
        const res= await axios.get(`${baseUrl}/${postId}`)
        const selectedPost=res.data
        document.getElementById('descriptionInp').value=selectedPost.description
        document.getElementById('nameInp').value=selectedPost.name
        
        selectedPostId=postId
    } catch (error) {
        console.log(error);
    }
    
}

async function updateData() {
    const descriptionInp = document.getElementById('descriptionInp').value
    const nameInp = document.getElementById('nameInp').value
    if (selectedPostId) {

        try {           
            await axios.put(`${baseUrl}/${selectedPostId}`,{
                description:descriptionInp,
                name:nameInp
            })

            
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    
    
}



fetchData()
