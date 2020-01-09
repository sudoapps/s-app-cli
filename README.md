<h2 align="center">
  <a href="https://sudoapps.com">Sudo Apps</a>
</h2>

<p align="center">
  The <i>s-app</i> CLI helps you monitor open source vulnerabilities in your application
</p>

---

## Installation

```
npm install @sudoapps/s-app-cli -g
```

## Authentication

Your authentication token can be found in your <a href="https://sudoapps.com/dashboard">dashboard</a>.

```
s-app auth --token TOKEN
```

## Generate Audit Report

Generate an audit report by running the following in any of your project directories. Visit your dashboard to view all generated reports and create monitors on a given project. 

<i>This is currently only available for node.js projects with a package.json and package-lock.json. Additional dependency support will be coming soon.</i>

```
s-app generate-report
```

<p align="center" style="margin-top: 40px">
  <a href="https://sudoapps.com/audit-report?repo=sudoapps/s-app-cli"><img src="https://sudoapps.com/sudo-apps.png" width="50px" height="60px" alt="Sudo Apps Report" /></a>
</p>