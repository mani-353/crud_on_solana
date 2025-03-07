#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod crud_on_solana {
    use super::*;

  pub fn close(_ctx: Context<CloseCrudOnSolana>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.crud_on_solana.count = ctx.accounts.crud_on_solana.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.crud_on_solana.count = ctx.accounts.crud_on_solana.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCrudOnSolana>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.crud_on_solana.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCrudOnSolana<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + CrudOnSolana::INIT_SPACE,
  payer = payer
  )]
  pub crud_on_solana: Account<'info, CrudOnSolana>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCrudOnSolana<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub crud_on_solana: Account<'info, CrudOnSolana>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub crud_on_solana: Account<'info, CrudOnSolana>,
}

#[account]
#[derive(InitSpace)]
pub struct CrudOnSolana {
  count: u8,
}
