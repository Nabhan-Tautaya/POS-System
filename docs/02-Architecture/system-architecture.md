                                    USERS

                                      │
                                      │
                                      ▼
                           React + Vite Frontend
                                      │
                                      │ HTTPS
                                      ▼
                             API Gateway (Express)
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼

    Authentication              Product Module              Sales Module

          │                           │                           │

          ▼                           ▼                           ▼

    Register Module            Hardware Module            Zoho Module

          │                           │                           │

          └───────────────┬───────────┴───────────────┬───────────┘
                          │                           │
                          ▼                           ▼

                    PostgreSQL                    Redis Cache

                          │
                          ▼

                  Background Workers

                          │

                          ▼

                     Zoho Books
