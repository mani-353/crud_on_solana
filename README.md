# 🧾 CRUD on Solana

A minimal on-chain application to **Create, Read, Update, and Delete** data on the Solana blockchain using the Anchor framework. This project demonstrates how typical backend operations can be securely implemented in a decentralized environment.

---

## 🧩 About the Project

Traditional CRUD applications are centralized and prone to manipulation or data loss. This project aims to explore how those operations can be shifted onto a **trustless, decentralized infrastructure** like Solana.

With `crud_on_solana`, we show that even simple backend logic can benefit from immutability, transparency, and on-chain data management using smart contracts.

---

### 🔑 Key Features

- 🔐 **Immutable history with on-chain transactions** – All operations are recorded on the blockchain, enhancing auditability and security.
- 🛠️ **Full CRUD functionality** – Users can create, update, read, and delete records stored in Solana accounts.
- 🧠 **Account management with PDA (Program Derived Addresses)** – Ensures data uniqueness and ownership.
- 📐 **Optimized for performance** – Minimal compute budget usage through efficient instruction handling.
- 🖼️ **Clean and interactive UI** – React + TailwindCSS frontend for smooth user interaction.
- 🔄 **Live updates and instant sync** – Changes are reflected immediately with wallet confirmation.


---

## 🛠 Tech Stack

- 🧱 **Solana Blockchain**
- 🧭 **Anchor Framework** (v0.29.0)
- ⚛️ **React + Vite** (Frontend)
- 💡 **TypeScript**
- 🎨 **TailwindCSS** for UI styling

---

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.30.1 or higher
- Solana CLI 1.18.17 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
pnpm install
```

#### Start the web app

```
pnpm dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the
command with `pnpm`, eg: `pnpm anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the
Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
pnpm anchor keys sync
```

#### Build the program:

```shell
pnpm anchor-build
```

#### Start the test validator with the program deployed:

```shell
pnpm anchor-localnet
```

#### Run the tests

```shell
pnpm anchor-test
```

#### Deploy to Devnet

```shell
pnpm anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
pnpm dev
```

Build the web app

```shell
pnpm build
```
---

## 🌐 Live Demo

🧪 [Live Demo Link](https://crud-on-solana.vercel.app/crud_on_solana)

---

## 🤝 Collaboration & Future Scope

Always happy to collaborate or improve the project further! PRs and suggestions are welcome 💬

### 🔮 Future Scope:

- 🧑‍💻 Multi-user support with access control  
- 🧾 Record history tracking for updates and deletes  
- 🧠 Advanced filtering/searching of on-chain data  
- 🧩 Integration with off-chain storage (e.g. IPFS)  
- 🪙 Token-gated access to CRUD features  

---

⭐ If this helped or inspired you, consider starring the repo and sharing it!

---

