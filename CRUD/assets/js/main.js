const dataTable =document.getElementById('dataTable')
const baseUrl='https://northwind.vercel.app/api/categories'


async function fetchData() {
    try {
        const response= await axios.get(baseUrl)
        // console.log(response.data);
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
       <button onclick="editPost(${item.id})">edit</button>
       <button onclick="deletePost${item.id})">delete</button>
       </td>
       `

        dataTable.append(row)

    });

}

async function createPost() {
    const descValue=document.getElementById('inpDesc').value
    const inpName=document.getElementById('inpName').value

    try {
       await axios.post(baseUrl,{
            description:descValue,
            name:inpName
        })
        fetchData()
        
    } catch (error) {
        console.log(error);
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

let editPostId=0
async function editPost(postId) {

    try {
      const response=await axios.get(`${baseUrl}/${postId}`)
      const post = response.data

      document.getElementById('inpDesc').value=post.description
      document.getElementById('inpName').value=post.name
        editPostId=postId
    } catch (error) {
        console.log(error);
    }
}

async function updatePost() {
    const descValue=document.getElementById('inpDesc').value
    const inpName=document.getElementById('inpName').value

    if (postId) {
        try {
            await axios.post(`${baseUrl}/${editPostId}`)
            
          } catch (error) {
              console.log(error);
          }
    }
    
}



fetchData()


// async function ad() {
//     const res= await axios('http://localhost:3000/comments')
//     console.log(res);
// }

// ad()