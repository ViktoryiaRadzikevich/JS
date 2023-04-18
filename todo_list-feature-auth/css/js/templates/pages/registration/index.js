const template = `
<div class="title">
    <H1>Registration<H1>
</div>
<div class="registration-form">
    <form>
        <label>Email</label>
        <input name="email"/>
        <span class="error"></span>

        <label>Password</label>
        <input name="password" type="password"/>
        <span class="error"></span>

        <label>Repeat Password</label>
        <input name="repeatPassword" type="password"/>
        <span class="error"></span>

        <button type="submit">Register</button>
    </form>
</div>
`;

export default template;