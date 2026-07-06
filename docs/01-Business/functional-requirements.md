# Functional Requirements Document (FRD)

## Retail / Supermarket Point of Sale (POS) System

**Reference:** Project Overview v1
**Status:** Draft for review

---

## 1. Introduction

This document translates the objectives and scope defined in the Project Overview into concrete, testable functional requirements. Each requirement is identified with a unique ID (`FR-<Module>-<Number>`) so it can be traced through design, development, and QA.

Requirements are grouped into 15 functional modules, aligned to the in-scope items from Section 3.1 of the Project Overview. Each requirement is tagged with a priority using MoSCoW:

- **Must** — required for v1 launch
- **Should** — important but not launch-blocking
- **Could** — nice to have if time permits

Items listed as **Out of Scope (v1)** in the Project Overview (offline operation, e-commerce, supplier management, payroll/HR, warehouse management, loyalty programs, AI features, mobile apps, marketing automation) are explicitly excluded from the requirements below.

---

## 2. User Roles Referenced in This Document

| Role                             | Description                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| **Platform Admin**               | Manages the overall platform and onboards organizations                                |
| **Org Admin**                    | Configures and manages a single organization (branches, users, products, receipts)     |
| **Cashier**                      | Performs day-to-day checkout, register, and shift operations                           |
| **Developer / Support Engineer** | Maintains, monitors, and supports the platform; not part of the core business workflow |
| **System**                       | Automated background processes (sync jobs, schedulers)                                 |

---

## 3. Functional Requirements

### 3.1 Authentication & Role-Based Access Control

| ID         | Requirement                                                                                                                                                       | Priority |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-AUTH-01 | The system shall require all users to authenticate with a unique username/email and password before accessing any part of the application.                        | Must     |
| FR-AUTH-02 | The system shall support four distinct roles — Platform Admin, Org Admin, Cashier, and Developer/Support Engineer — each with a defined set of permitted actions. | Must     |
| FR-AUTH-03 | The system shall restrict access to screens, actions, and data based on the authenticated user's role and assigned organization/branch.                           | Must     |
| FR-AUTH-04 | The system shall enforce password complexity rules and support secure password reset via a verified channel (e.g., email).                                        | Must     |
| FR-AUTH-05 | The system shall automatically log out or lock a session after a configurable period of inactivity.                                                               | Should   |
| FR-AUTH-06 | The system shall allow an Org Admin to enable or disable individual user accounts within their organization.                                                      | Must     |
| FR-AUTH-07 | The system shall log every authentication attempt (success and failure) for audit purposes.                                                                       | Must     |
| FR-AUTH-08 | The system shall support PIN-based quick login for cashiers at a shared POS terminal, in addition to full credential login.                                       | Should   |

### 3.2 Organization Management

| ID        | Requirement                                                                                                                               | Priority |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-ORG-01 | The system shall allow a Platform Admin to create, edit, suspend, and reactivate organizations.                                           | Must     |
| FR-ORG-02 | The system shall isolate all data (users, branches, products, sales, settings) between organizations.                                     | Must     |
| FR-ORG-03 | The system shall allow a Platform Admin to configure organization-level settings, including the associated Zoho Books account/connection. | Must     |
| FR-ORG-04 | The system shall allow an Org Admin to view and update their own organization's profile information (name, address, tax details, logo).   | Must     |
| FR-ORG-05 | The system shall support onboarding a new organization without requiring changes to shared application code.                              | Should   |

### 3.3 Branch Management

| ID       | Requirement                                                                                                                        | Priority |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-BR-01 | The system shall allow an Org Admin to create, edit, and deactivate branches within their organization.                            | Must     |
| FR-BR-02 | The system shall allow each branch to have its own set of registers, cashiers, and stock levels.                                   | Must     |
| FR-BR-03 | The system shall allow an Org Admin to assign users to one or more specific branches.                                              | Must     |
| FR-BR-04 | The system shall allow reporting and reconciliation data to be filtered and viewed per branch or consolidated across all branches. | Should   |
| FR-BR-05 | The system shall prevent a cashier from processing sales for a branch to which they are not assigned.                              | Must     |

### 3.4 User Management

| ID        | Requirement                                                                                                                            | Priority |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-USR-01 | The system shall allow an Org Admin to create, edit, and deactivate user accounts (Org Admins and Cashiers) within their organization. | Must     |
| FR-USR-02 | The system shall allow an Org Admin to assign or change a user's role and branch assignment(s).                                        | Must     |
| FR-USR-03 | The system shall allow a Platform Admin to create and manage Org Admin accounts during organization onboarding.                        | Must     |
| FR-USR-04 | The system shall maintain a history of role and permission changes for each user.                                                      | Should   |
| FR-USR-05 | The system shall prevent deletion of a user with historical sales or register activity; deactivation shall be used instead.            | Must     |

### 3.5 Cash Register Management

| ID        | Requirement                                                                                                                                             | Priority |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-REG-01 | The system shall allow a cashier to open a register session by entering a starting cash float.                                                          | Must     |
| FR-REG-02 | The system shall prevent a sale from being processed unless an open register session exists for the current cashier and terminal.                       | Must     |
| FR-REG-03 | The system shall allow only one active session per physical register at a time.                                                                         | Must     |
| FR-REG-04 | The system shall allow a cashier to close a register session, entering the counted cash amount and generating a variance report against expected cash.  | Must     |
| FR-REG-05 | The system shall allow an Org Admin to view all open and closed register sessions across branches.                                                      | Must     |
| FR-REG-06 | The system shall record every cash-in and cash-out event (e.g., paid-in, paid-out, till top-up) against the active register session.                    | Must     |
| FR-REG-07 | The system shall allow an Org Admin to force-close a register session in exceptional circumstances (e.g., forgotten close-out), with the action logged. | Should   |

### 3.6 Shift Management & Cashier Attendance

| ID          | Requirement                                                                                                     | Priority |
| ----------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| FR-SHIFT-01 | The system shall allow a cashier to clock in at the start of a shift and clock out at the end.                  | Must     |
| FR-SHIFT-02 | The system shall associate each sale with the cashier's active shift.                                           | Must     |
| FR-SHIFT-03 | The system shall allow an Org Admin to define shift schedules and view scheduled vs. actual clock-in/out times. | Should   |
| FR-SHIFT-04 | The system shall alert or flag a shift that ends without a corresponding register close-out.                    | Should   |
| FR-SHIFT-05 | The system shall allow an Org Admin to generate a report of hours worked per cashier per period.                | Could    |

### 3.7 Product Management

| ID         | Requirement                                                                                                                                                 | Priority |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-PROD-01 | The system shall allow a cashier to look up a product by barcode scan, SKU, or name search during checkout.                                                 | Must     |
| FR-PROD-02 | The system shall display current price, tax classification, and available stock quantity when a product is looked up.                                       | Must     |
| FR-PROD-03 | The system shall allow an Org Admin to view the product catalog synchronized from Zoho Books.                                                               | Must     |
| FR-PROD-04 | The system shall allow an Org Admin to manage POS-specific product settings that are not stored in Zoho Books (e.g., quick-sale buttons, display grouping). | Should   |
| FR-PROD-05 | The system shall support products sold by weight or unit and handle quantity entry accordingly.                                                             | Must     |
| FR-PROD-06 | The system shall flag or block the sale of a product that is out of stock, based on the configured stock policy.                                            | Must     |
| FR-PROD-07 | The system shall support product variants (e.g., size, pack) as distinct sellable items.                                                                    | Should   |

### 3.8 Inventory Synchronization

| ID        | Requirement                                                                                                                 | Priority |
| --------- | --------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-INV-01 | The system shall synchronize product and stock-level data from Zoho Books to the POS on a scheduled and on-demand basis.    | Must     |
| FR-INV-02 | The system shall decrement local stock quantities in real time as sales are completed.                                      | Must     |
| FR-INV-03 | The system shall push stock-affecting transactions (sales, returns) back to Zoho Books to keep inventory levels consistent. | Must     |
| FR-INV-04 | The system shall detect and report synchronization failures or conflicts to an Org Admin.                                   | Must     |
| FR-INV-05 | The system shall log the timestamp and outcome of every synchronization attempt with Zoho Books.                            | Must     |
| FR-INV-06 | The system shall allow an Org Admin to manually trigger a full re-synchronization of product and stock data.                | Should   |

### 3.9 Sales & Checkout Processing

| ID         | Requirement                                                                                                                                         | Priority |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-SALE-01 | The system shall allow a cashier to build a sale by adding, editing quantity of, and removing line items.                                           | Must     |
| FR-SALE-02 | The system shall automatically calculate line totals, applicable taxes, and the order total as items are added.                                     | Must     |
| FR-SALE-03 | The system shall allow a cashier to apply a discount to an individual line item or to the entire sale, within permissions defined by the Org Admin. | Must     |
| FR-SALE-04 | The system shall allow a cashier to void a line item or cancel an entire sale before payment is finalized, with the action logged.                  | Must     |
| FR-SALE-05 | The system shall allow a cashier to process a return or refund against a completed sale, subject to role permissions.                               | Must     |
| FR-SALE-06 | The system shall require every completed sale to be associated with an authenticated cashier, an open register session, and a branch.               | Must     |
| FR-SALE-07 | The system shall allow a sale to be put on hold and resumed later without losing line-item data.                                                    | Should   |
| FR-SALE-08 | The system shall generate a unique, sequential transaction/receipt number for every completed sale, per branch.                                     | Must     |

### 3.10 Payment Processing

| ID        | Requirement                                                                                                                                                                 | Priority |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-PAY-01 | The system shall support cash as a payment method, including calculation of change due.                                                                                     | Must     |
| FR-PAY-02 | The system shall support card payments via an integrated payment terminal.                                                                                                  | Must     |
| FR-PAY-03 | The system shall support split payments across two or more payment methods for a single sale.                                                                               | Must     |
| FR-PAY-04 | The system shall support recording an online banking payment confirmation (e.g., reference number) as a payment method.                                                     | Must     |
| FR-PAY-05 | The system shall prevent a sale from being marked complete until the full amount due has been collected across all payment methods used.                                    | Must     |
| FR-PAY-06 | The system shall record the payment method(s), amounts, and any reference numbers against each completed sale.                                                              | Must     |
| FR-PAY-07 | The system shall handle a declined or failed card/terminal transaction by allowing the cashier to retry or select an alternate payment method without duplicating the sale. | Must     |

### 3.11 Receipts & Templates

| ID         | Requirement                                                                                                                                              | Priority |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-RCPT-01 | The system shall generate a receipt automatically upon completion of a sale.                                                                             | Must     |
| FR-RCPT-02 | The system shall print the receipt to a connected receipt printer.                                                                                       | Must     |
| FR-RCPT-03 | The system shall allow an Org Admin to configure a receipt template, including logo, header/footer text, and displayed fields.                           | Must     |
| FR-RCPT-04 | The system shall support reprinting a receipt for a previously completed sale.                                                                           | Must     |
| FR-RCPT-05 | The system shall allow a cashier to email or otherwise send a digital copy of the receipt, where configured.                                             | Could    |
| FR-RCPT-06 | The system shall include organization/branch details, itemized line items, taxes, discounts, payment method(s), and transaction number on every receipt. | Must     |

### 3.12 Reconciliation & Register Balancing

| ID          | Requirement                                                                                                                              | Priority |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-RECON-01 | The system shall calculate expected cash and card totals for a register session based on recorded transactions.                          | Must     |
| FR-RECON-02 | The system shall compare counted cash entered at register close against the expected amount and report any variance.                     | Must     |
| FR-RECON-03 | The system shall generate a daily reconciliation report per branch, summarizing sales, refunds, payment method breakdown, and variances. | Must     |
| FR-RECON-04 | The system shall allow an Org Admin to review and approve/flag reconciliation reports.                                                   | Should   |
| FR-RECON-05 | The system shall retain reconciliation history for audit and reporting purposes.                                                         | Must     |

### 3.13 Audit Logging

| ID          | Requirement                                                                                                                                    | Priority |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-AUDIT-01 | The system shall log all business-significant actions, including sales, voids, refunds, discounts, register open/close, and user/role changes. | Must     |
| FR-AUDIT-02 | Each audit log entry shall record the acting user, timestamp, branch, action type, and relevant before/after values where applicable.          | Must     |
| FR-AUDIT-03 | The system shall prevent modification or deletion of audit log entries by any user role.                                                       | Must     |
| FR-AUDIT-04 | The system shall allow an Org Admin to search and filter audit logs by user, date range, branch, and action type.                              | Must     |
| FR-AUDIT-05 | The system shall allow a Platform Admin to access audit logs across all organizations for support and compliance purposes.                     | Should   |

### 3.14 Hardware Integration

| ID       | Requirement                                                                                                                                                      | Priority |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-HW-01 | The system shall integrate with barcode scanners to add products to a sale via scan input.                                                                       | Must     |
| FR-HW-02 | The system shall integrate with receipt printers to print receipts automatically upon sale completion.                                                           | Must     |
| FR-HW-03 | The system shall integrate with cash drawers, triggering an open signal upon a completed cash payment or authorized manual open.                                 | Must     |
| FR-HW-04 | The system shall integrate with payment terminals to initiate, receive status of, and confirm card transactions.                                                 | Must     |
| FR-HW-05 | The system shall be designed with a modular hardware interface layer so that new device vendors can be supported with minimal changes to core application logic. | Should   |
| FR-HW-06 | The system shall detect and alert the cashier when a required hardware device (printer, scanner, drawer, terminal) is disconnected or unresponsive.              | Should   |

### 3.15 Zoho Books Integration

| ID       | Requirement                                                                                                                                                  | Priority |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| FR-ZB-01 | The system shall authenticate and connect to an organization's Zoho Books account using a secure, per-organization connection.                               | Must     |
| FR-ZB-02 | The system shall synchronize product catalog, pricing, and tax information from Zoho Books.                                                                  | Must     |
| FR-ZB-03 | The system shall push completed sales, refunds, and payment records to Zoho Books as corresponding financial transactions.                                   | Must     |
| FR-ZB-04 | The system shall synchronize customer records with Zoho Books where a customer is associated with a sale.                                                    | Should   |
| FR-ZB-05 | The system shall reflect Zoho Books as the system of record; in case of conflict, POS data shall be reconciled against Zoho Books rather than overriding it. | Must     |
| FR-ZB-06 | The system shall notify an Org Admin when a transaction fails to synchronize with Zoho Books, with the ability to retry manually.                            | Must     |

---

## 4. Cross-Cutting Requirements

| ID       | Requirement                                                                                                                           | Priority |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-XC-01 | The system shall support concurrent use by multiple cashiers across multiple registers within the same branch without data conflicts. | Must     |
| FR-XC-02 | The system shall support multiple organizations operating independently on the same platform without data leakage between them.       | Must     |
| FR-XC-03 | The system shall be designed so that onboarding a new organization does not require architectural changes to the core platform.       | Should   |

---

## 5. Traceability Summary

| Project Overview In-Scope Item                                      | Covered By        |
| ------------------------------------------------------------------- | ----------------- |
| Secure authentication & RBAC                                        | Section 3.1       |
| Multi-organization architecture                                     | Section 3.2, 4    |
| Multi-branch management                                             | Section 3.3       |
| Cash register management                                            | Section 3.5       |
| Cashier clock-in/out & shift management                             | Section 3.6       |
| Product lookup and management                                       | Section 3.7       |
| Inventory synchronization                                           | Section 3.8, 3.15 |
| Sales processing                                                    | Section 3.9       |
| Receipt generation & templates                                      | Section 3.11      |
| Cash, card, split, online banking payments                          | Section 3.10      |
| Daily reconciliation & register balancing                           | Section 3.12      |
| Audit logging                                                       | Section 3.13      |
| Barcode scanner, printer, cash drawer, payment terminal integration | Section 3.14      |
| Synchronization with Zoho Books                                     | Section 3.15      |

---

## 6. Open Questions for Stakeholder Review

1. What discount permission limits (e.g., max % without approval) should apply to cashiers vs. Org Admins?
2. Which payment terminal provider(s) need to be supported at launch?
3. Should refunds require manager/Org Admin approval above a certain amount?
4. What is the required frequency for Zoho Books synchronization (real-time, near-real-time, scheduled interval)?
5. Are there receipt/tax compliance requirements specific to the target region that must be reflected in receipt templates?
