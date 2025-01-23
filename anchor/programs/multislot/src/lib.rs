#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod multislot {
    use super::*;

  pub fn close(_ctx: Context<CloseMultislot>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.multislot.count = ctx.accounts.multislot.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.multislot.count = ctx.accounts.multislot.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeMultislot>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.multislot.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeMultislot<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Multislot::INIT_SPACE,
  payer = payer
  )]
  pub multislot: Account<'info, Multislot>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseMultislot<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub multislot: Account<'info, Multislot>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub multislot: Account<'info, Multislot>,
}

#[account]
#[derive(InitSpace)]
pub struct Multislot {
  count: u8,
}
