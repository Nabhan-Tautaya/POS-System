# Business Workflows

## 1. Purpose

This document defines the core operational workflows of the Point of Sale (POS) system. Each workflow represents a business process that the application must support. These workflows form the foundation for the system architecture, database design, API specification, and implementation roadmap.

The workflows described in this document represent the minimum viable operational processes required for Version 1 of the POS system.

---

# Workflow 1 — User Authentication

## Objective

Authenticate users securely and provide access according to their assigned role and organization.

## Actors

- Platform Administrator
- Organization Administrator
- Cashier

## Trigger

A user attempts to access the POS system.

## Primary Flow

1. User enters their credentials.
2. The system validates the credentials.
3. The system verifies that the user account is active.
4. The system loads the user's organization.
5. The system loads the user's assigned branch.
6. The system determines the user's permissions.
7. The user is redirected to the appropriate dashboard.

## Business Rules

- Every user belongs to exactly one organization.
- Cashiers are assigned to one branch.
- Only active users may log in.
- All authentication attempts are recorded in the audit log.

---

# Workflow 2 — Shift Management

## Objective

Track cashier attendance and operational shifts.

## Actors

- Cashier

## Trigger

Cashier begins or ends a work session.

## Primary Flow

### Clock In

1. Cashier logs into the system.
2. Cashier selects their assigned register.
3. System verifies that the register is available.
4. Shift record is created.
5. Shift status becomes Active.

### Clock Out

1. Cashier finishes all pending transactions.
2. Cashier selects Clock Out.
3. Shift end time is recorded.
4. Shift status becomes Closed.

## Business Rules

- A cashier may have only one active shift.
- A cashier cannot process sales without an active shift.
- Every shift belongs to one register and one branch.

---

# Workflow 3 — Register Management

## Objective

Control the lifecycle of a physical cash register.

## Actors

- Organization Administrator
- Cashier

## Trigger

Register opening or closing.

## Primary Flow

### Open Register

1. Administrator opens the register.
2. Initial cash float is entered.
3. Register status becomes Open.
4. Cashier is assigned.

### During Operation

- Register processes sales.
- Cash drawer opens when required.
- Cash movements are recorded.

### Close Register

1. Sales are completed.
2. Cashier ends their shift.
3. Register proceeds to reconciliation.
4. Register status becomes Closed.

## Business Rules

- One active session per register.
- Register cannot close while an active shift exists.
- Cash movements must be recorded.

---

# Workflow 4 — Product Management

## Objective

Maintain an accurate product catalogue synchronized with Zoho Books.

## Actors

- Organization Administrator
- Cashier
- Zoho Books

## Trigger

Product synchronization, product creation, barcode scan, or product search.

## Primary Flow

### Product Synchronization

1. Products are retrieved from Zoho Books.
2. Local cache is updated.
3. Inventory information is refreshed.

### Product Creation

1. Administrator creates a product.
2. Product is created in Zoho Books.
3. Local cache is refreshed.

### Product Lookup

1. Cashier scans a barcode or searches by name.
2. Product is retrieved from the local cache.
3. Product information is displayed.

## Business Rules

- Zoho Books is the system of record for products and inventory.
- Barcode values must be unique.
- Products cannot have negative prices.

---

# Workflow 5 — Sales Processing

## Objective

Complete a customer sale efficiently and accurately.

## Actors

- Cashier

## Trigger

Customer arrives at checkout.

## Primary Flow

1. Cashier starts a new sale.
2. Products are scanned or searched.
3. Products are added to the cart.
4. Quantities may be modified.
5. Discounts are applied (if authorized).
6. Taxes are calculated.
7. Sale total is displayed.
8. Customer proceeds to payment.

## Business Rules

- Every sale belongs to one cashier.
- Every sale belongs to one branch.
- Every sale belongs to one register.
- Every sale generates an audit record.

---

# Workflow 6 — Payment Processing

## Objective

Record payment completion for a sale.

## Actors

- Cashier
- Customer
- Payment Terminal

## Supported Payment Methods

- Cash
- Card
- Split Payment
- Online Banking Confirmation

## Primary Flow

### Cash Payment

1. Cashier receives cash.
2. System calculates change.
3. Cash drawer opens.
4. Payment is completed.

### Card Payment

1. Amount is sent to the payment terminal.
2. Customer completes payment.
3. Terminal returns Approved or Declined.
4. POS records the payment result.

### Split Payment

1. Cashier selects Split Payment.
2. Customer chooses payment amounts.
3. Multiple payment methods are processed.
4. Sale completes once the full balance is paid.

## Business Rules

- Payment terminals process transactions independently.
- The POS records payment outcomes.
- A sale may contain multiple payment records.

---

# Workflow 7 — Receipt Generation

## Objective

Generate and print customer receipts.

## Actors

- Cashier

## Trigger

Successful payment.

## Primary Flow

1. Sale is completed.
2. Receipt template is selected.
3. Sale information is merged into the template.
4. Receipt is printed.
5. Optional digital receipt may be generated.

## Business Rules

- Receipt templates are organization-specific.
- Receipts must contain mandatory fiscal information where applicable.

---

# Workflow 8 — Zoho Books Synchronization

## Objective

Synchronize business data with Zoho Books.

## Actors

- POS System
- Zoho Books

## Trigger

Completion of business events requiring synchronization.

## Primary Flow

1. Sale is completed.
2. Synchronization task is created.
3. Zoho integration service processes the task.
4. Invoice is created in Zoho Books.
5. Inventory is updated.
6. Synchronization status is recorded.

## Business Rules

- Zoho Books remains the system of record.
- POS operations should not wait for synchronization to complete.
- Failed synchronizations must be retried and logged.

---

# Workflow 9 — Daily Reconciliation

## Objective

Verify that recorded transactions match physical cash and payment totals.

## Actors

- Organization Administrator

## Trigger

Register closing.

## Primary Flow

1. Register closes.
2. Cash is counted.
3. Expected totals are calculated.
4. Actual totals are entered.
5. Differences are calculated.
6. Reconciliation report is generated.
7. Register session is finalized.

## Business Rules

- Every register session requires reconciliation.
- Differences must be recorded.
- Reconciliation records cannot be modified after approval.

---

# Cross-Cutting Workflow — Audit Logging

## Objective

Maintain a complete history of significant business events.

## Events to Audit

- User login and logout
- Shift start and end
- Register open and close
- Sale creation
- Sale completion
- Refunds
- Price overrides
- Product creation and updates
- Settings changes
- Zoho synchronization failures
- Permission changes

## Business Rules

- Audit records are immutable.
- Audit logs must include the user, timestamp, organization, branch, and action performed.

---

# Workflow Relationships

The operational flow of the POS system follows the sequence below:

User Authentication

↓

Shift Management

↓

Register Opening

↓

Product Lookup

↓

Sales Processing

↓

Payment Processing

↓

Receipt Generation

↓

Zoho Books Synchronization

↓

Continue Sales

↓

Shift End

↓

Daily Reconciliation

↓

Register Closure

---

# Notes

These workflows represent the core operational behaviour of Version 1 of the POS system. They intentionally avoid implementation details and instead define the expected business processes. Future architectural, database, and API decisions should support these workflows without altering the business behaviour described in this document.
