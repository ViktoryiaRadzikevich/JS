const template = `
<div class="title">
    <H1>Log In<H1>
</div>
<div class="login-form">
    <form>
        <label>Email</label>
        <input name="email"/>
        <span class="error"></span>

        <label>Password</label>
        <input name="password" type="password"/>
        <span class="error"></span>

        <button type="submit">Log In</button>
        <button  class="to-registration-btn btn">Registration</button>
        
    </form>
    
    
</div>

`;

export default template;