import "./style.css";

const DeletionDisclaimer = () => {
  return (
    <article
      id="account-deletion-disclaimer"
    >
      <strong>Please read this before continuing:</strong>
      <ul>
        <li>
          All of your data and history will be permanently deleted, which includes:
          <ul>
            <li>Your profile data</li>
            <li>Performance analytics</li>
            <li>Test histories</li>
          </ul>
        </li>
        <li>This action is permanent and cannot be undone.</li>
      </ul>
    </article>
  );
}

export default DeletionDisclaimer;
