---
title: "Postman — How to Auto-Update Environment Variables?"
date: "2024-04-05"
description: "Trick to optimize API testing in Postman: use Test scripts to capture the Access Token and save it automatically as an environment variable."
---

# Postman — How to Auto-Update Environment Variables?

**Channel:** BacaroTech (YouTube)  
**Language:** 🇮🇹 Italian (subtitles not available)  
**Type:** Tutorial

---

## The Solution: Postman Test Scripts

In the **Tests** tab of your login request, paste:

```javascript
const jsonData = pm.response.json();
const token = jsonData.access_token;
pm.environment.set("access_token", token);
console.log("Token saved:", token.substring(0, 20) + "...");
```

Then in all other requests, set the authorization header:

```
Authorization: Bearer {{access_token}}
```

---

## Resources

- [Watch on YouTube](https://www.youtube.com/watch?v=KA6e8PAksYw)
- [Postman Scripting Documentation](https://learning.postman.com/docs/writing-scripts/intro-to-scripts/)
