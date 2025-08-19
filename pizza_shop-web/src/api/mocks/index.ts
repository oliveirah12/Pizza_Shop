import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getDailyRevenuesInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getPopularProductsMock } from './get-popular-produtos-mock'

export const worker = setupWorker(
  signInMock, 
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthRevenueMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getDailyRevenuesInPeriodMock,
  getPopularProductsMock
)
export async function enableMSW(){
  if(env.MODE !== 'test'){
    return 
  }
  await worker.start()
}