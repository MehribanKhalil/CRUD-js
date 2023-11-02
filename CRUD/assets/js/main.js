const baseUrl="https://northwind.vercel.app/api/categories"
const dataTable=document.getElementById('dataTable')


async function fetchData() {
    try {
        const response=await axios.get(baseUrl)
        addTable(response.data)
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
            <button onclick="editPost(${item.id})">Edit</button>
            <button onclick="deletePost(${item.id})">Delete</button>
        </td>
        `
        dataTable.appendChild(row)
    });
    
}

async function createPost(){
    const descriptionInput=document.getElementById('inpDesc').value
    const nameInput=document.getElementById('inpName').value
    try {
        
        await axios.post(baseUrl,{
           
            description:descriptionInput,
            name:nameInput
        })
        fetchData()

    } catch (error) {
        console.log(error);
    }
}

let editPosdId=null

async function editPost(postId) {
    
    try {
        const response= await axios.get(`${baseUrl}/${postId}`)
       
        const post=response.data
        
        document.getElementById('inpDesc').value=post.description
   document.getElementById('inpName').value=post.name
    
    editPosdId=postId
    } catch (error) {
        console.log(error);
    }
}

async function updatePost() {
    const descriptionInput=document.getElementById('inpDesc').value
    const nameInput=document.getElementById('inpName').value
    if(editPosdId){
        try {
           await axios.put(`${baseUrl}/${editPosdId}`,{
                description:descriptionInput,
                name:nameInput
            })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

}


async function deletePost(postId) {
    try {
        
        await axios.delete(`${baseUrl}/${postId}`)
        fetchData()
    } catch (error) {
        console.log(error);
    }
}

fetchData()