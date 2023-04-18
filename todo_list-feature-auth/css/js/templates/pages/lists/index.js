const template = ` 
<div class="title">
        <H1>List of My Todo Lists<i class="fas fa-pencil-alt"></i></H1>
        </div>
<div class="add-form">
    <form action="">
        <input type="text" name="name" placeholder="Enter list name...">
        <button type="submit"><i class="fas fa-plus"></i></button>
        <div id="input-border"></div>
    </form>
</div>
<div class="list-of-lists">
<ol >
    
</ol>
</div>
<div class="delete-checked-wrapper"><button class="delete-checked-btn" disabled="true">Delete Checked</button>
</div>
`

export default template;

// <li>
//         <a>List #1</a>
//     </li>
//     <li>
//         <a>List #2</a>
//     </li>
//     <li>
//         <a>List #3</a>
//     </li>
//     <li>
//         <a>List #4</a>
//     </li>
