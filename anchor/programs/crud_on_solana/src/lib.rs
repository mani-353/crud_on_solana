#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("2vP3NBeycF7fhm66QcecEE1YmsGFiGWeDZXVSxaLNJzR");

#[program]
pub mod crud_on_solana {
    use super::*;
    pub fn create(ctx: Context<Create>, title: String, description: String) -> Result<()> {
        let journalist = &mut ctx.accounts.journalist;
        msg!("Journalist account created successfully");
        msg!("tilte: {}", title);
        msg!("description: {}", description);
        journalist.owner = *ctx.accounts.owner.key;
        journalist.title = title;
        journalist.description = description;
        Ok(())
    }
    pub fn update(ctx: Context<Update>, title: String, description: String) -> Result<()> {
        let journalist = &mut ctx.accounts.journalist;
        msg!("Journalist account updated successfully");
        msg!("tilte: {}", title);
        msg!("description: {}", description);
        journalist.title = title;
        journalist.description = description;
        Ok(())
    }
    pub fn delete(_ctx: Context<Delete>,_title:String) -> Result<()> {
        msg!("Journalist account deleted successfully");
        Ok(())
    }
}
#[derive(Accounts)]
#[instruction(title: String)]
pub struct Create<'info> {
    #[account(init, payer = owner,seeds=[title.as_bytes(),owner.key().as_ref()],bump,space=8+Journalist::INIT_SPACE)]
    pub journalist: Account<'info, Journalist>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String, message: String)]
pub struct Update<'info> {
    #[account(mut,seeds=[title.as_bytes(),owner.key().as_ref()],bump,realloc = 8 + 32 + 4 + title.len() + 4 + message.len(),realloc::payer=owner,realloc::zero=true)]
    pub journalist: Account<'info, Journalist>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct Delete<'info> {
    #[account(mut,seeds=[title.as_bytes(),owner.key().as_ref()],bump,close=owner)]
    pub journalist: Account<'info, Journalist>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[account]
#[derive(InitSpace)]
pub struct Journalist {
    pub owner: Pubkey,
    #[max_len(50)]
    pub title: String,
    #[max_len(1000)]
    pub description: String,
}
