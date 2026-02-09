# Manual Database Test for Subscription Expiration

## Step-by-Step Test

### **Step 1: Find Your User**

Run this SQL to see your current subscription status:

```sql
SELECT id, email, isSubscribed, subscriptionEndDate, questsPlayed, questsCreated 
FROM user 
WHERE isSubscribed = 1
LIMIT 1;
```

Copy the `id` and `email` - you'll need them.

---

### **Step 2: Set End Date to Yesterday (2/7)**

Run this SQL to set the end date to February 7, 2026:

```sql
UPDATE user 
SET subscriptionEndDate = '2026-02-07 00:00:00'
WHERE isSubscribed = 1;
```

Verify it worked:

```sql
SELECT email, isSubscribed, subscriptionEndDate 
FROM user 
WHERE isSubscribed = 1;
```

Should show:
- `isSubscribed = 1` (still active in database)
- `subscriptionEndDate = 2026-02-07 00:00:00` (yesterday)

---

### **Step 3: Trigger Auto-Cancellation**

**Important:** The middleware only runs when you make an **authenticated API request**.

1. **Open your app** in browser (http://localhost:3000)
2. **Make sure you're logged in**
3. **Refresh the page** or **click any link**

---

### **Step 4: Watch Server Console**

You should see these logs in your server terminal:

```
[SUBSCRIPTION CHECK] User: xxxxxxxx...
[SUBSCRIPTION CHECK] isSubscribed: true, endDate: 2026-02-07T00:00:00.000Z
[SUBSCRIPTION CHECK] Current time: 2026-02-08T08:18:00.000Z
[SUBSCRIPTION] ⚠️ EXPIRING SUBSCRIPTION - End date passed!
[SUBSCRIPTION] End date was: 2026-02-07T00:00:00.000Z, Current time: 2026-02-08T08:18:25.000Z
[SUBSCRIPTION] ✅ Subscription cancelled for user: xxxxxxxx...
```

---

### **Step 5: Verify Database Changed**

Run this SQL again:

```sql
SELECT email, isSubscribed, subscriptionEndDate, cancelAtPeriodEnd
FROM user 
WHERE email = 'your@email.com';
```

Should now show:
- `isSubscribed = 0` ✅ (CHANGED from 1 to 0)
- `subscriptionEndDate = 2026-02-07 00:00:00` (unchanged)
- `cancelAtPeriodEnd = 0`

---

### **Step 6: Test Quest Limits**

Try to play or create a 2nd quest:

**Expected Result:** ❌ BLOCKED

Error message:
```
"Free tier limit reached: You can only play 1 quest. Upgrade to Pro for unlimited quest plays."
```

---

## Troubleshooting

### **If `isSubscribed` doesn't change to 0:**

1. **Check if you're logged in** - middleware only runs for authenticated users
2. **Check server logs** - do you see `[SUBSCRIPTION CHECK]` messages?
3. **If no logs appear:**
   - You're not making authenticated requests
   - Check if JWT token is being sent in request headers
4. **Try these API calls manually:**
   - Visit: http://localhost:5000/api/auth/me
   - Visit: http://localhost:5000/api/quests

### **If you see logs but status doesn't change:**

Check the comparison logic:
- Current time: `2026-02-08` (today)
- End date: `2026-02-07` (yesterday)
- Is `2026-02-08 > 2026-02-07`? → **YES** → Should cancel

---

## Quick SQL Commands

**Reset to test again:**
```sql
-- Re-subscribe user
UPDATE user 
SET isSubscribed = 1, 
    subscriptionEndDate = '2026-03-08 00:00:00',
    questsPlayed = 0,
    questsCreated = 0
WHERE email = 'your@email.com';
```

**Set to expired:**
```sql
UPDATE user 
SET subscriptionEndDate = '2026-02-07 00:00:00'
WHERE email = 'your@email.com';
```

**Check status:**
```sql
SELECT email, isSubscribed, subscriptionEndDate 
FROM user 
WHERE email = 'your@email.com';
```
