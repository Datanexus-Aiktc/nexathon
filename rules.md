
# Contributing Rules for Nexathon Website

Please follow these rules strictly to avoid conflicts and keep the codebase clean.

---

## 🔹 General Workflow

* Always **sync your local repo before making any changes**.
* **DO NOT commit directly to `main`**.
* Use a **new branch** for each feature or bugfix.
* **Inform in the WhatsApp group before you commit or push**.

---

## 🔹 Git Workflow

### 1. Keep your repo updated

Always pull before starting new work to avoid merge conflicts.

```bash
# Fetch and merge latest changes
git pull origin main
```

⚠️ **Highlight**: Not pulling before making changes is the most common cause of conflicts.

---

### 2. Create a new branch for your work

Never commit directly to `main`. Always create a branch.

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

---

### 3. Commit your changes

Make commits small and meaningful.

```bash
# Stage your changes
git add .

# Commit with a clear message
git commit -m "Add timeline section styles"
```

---

### 4. Push your branch

Push to GitHub under the same branch name.

```bash
git push origin feature/your-feature-name
```

---

### 5. Open a Pull Request (PR)

* Go to GitHub → open PR from your branch into `main`.
* Wait for at least one team member to review before merging.

---

## 🔹 CSS Rules

* Use only the color **variables defined in `:root` inside `styles.css`**. Example:

  ```css
  color: var(--primary);
  background-color: var(--bg);
  ```

* Each section in `styles.css` has **commented blocks** (e.g., `/* Timeline Section */`).

  * Add or update CSS **only inside the correct section block**.
  * Do not scatter unrelated CSS in other sections.

---

## 🔹 Communication Rule

* Before committing or pushing changes, **inform the team in the WhatsApp group**.
* Mention what you are committing (e.g., "Adding FAQ accordion JS").

---

## ✅ Summary

* Always `git pull` before work.
* Always work on a **new branch** → push → make a **pull request**.
* Never commit directly to `main`.
* Use **root CSS variables only**.
* Keep CSS changes inside the **section comment block**.
* Always **inform on WhatsApp before committing**.


