const template = `
<div class="title">
    <H1>My Todo List <i class="fas fa-pencil-alt"></i></H1>
</div>
<div class="add-form">
    <form action="">
        <input type="text" name="text" placeholder="Enter task...">
        <button type="submit"><i class="fas fa-plus"></i></button>
        <div id="input-border"></div>
    </form>
</div>
<div class="todo-list">
    <ol></ol>
</div>
<div class="delete-checked-wrapper"><button class="delete-checked-btn" disabled="true">Delete Checked</button>
</div> 
`

export default template;