import { useCallback, useMemo, useState } from 'react'

import { Service } from '@/mocks/service-data'
import { mockVouchers, Voucher } from '@/mocks/voucher-data'

export type VoucherStatus =
  | { state: 'idle' }
  | { state: 'invalid'; error: string }
  | { state: 'valid'; voucher: Voucher; discountAmount: number }

type UseVoucherArgs = {
  services: Service[]
  baseAmount: number
}

type UseVoucherResult = {
  inputCode: string
  setInputCode: (value: string) => void
  status: VoucherStatus
  applyVoucher: () => void
  clearVoucher: () => void
}

function calcDiscount(voucher: Voucher, baseAmount: number): number {
  if (voucher.discount.type === 'fixed') {
    return Math.min(voucher.discount.amount, baseAmount)
  }
  const percentAmount = Math.floor((baseAmount * voucher.discount.percent) / 100)
  if (voucher.discount.maxAmount) {
    return Math.min(percentAmount, voucher.discount.maxAmount, baseAmount)
  }
  return Math.min(percentAmount, baseAmount)
}

function findVoucher(code: string): Voucher | null {
  const normalized = code.trim().toUpperCase()
  return mockVouchers.find((v) => v.code === normalized) ?? null
}

export function useVoucher({ services, baseAmount }: UseVoucherArgs): UseVoucherResult {
  const [inputCode, setInputCode] = useState('')
  const [status, setStatus] = useState<VoucherStatus>({ state: 'idle' })

  const selectedCategories = useMemo(() => new Set(services.map((s) => s.categoryId)), [services])

  const applyVoucher = useCallback(() => {
    const voucher = findVoucher(inputCode)
    if (!voucher) {
      setStatus({ state: 'invalid', error: 'Mã không tồn tại hoặc đã hết hạn' })
      return
    }
    if (voucher.expired) {
      setStatus({ state: 'invalid', error: 'Mã đã hết hạn' })
      return
    }
    if (voucher.applicableCategories) {
      const matched = voucher.applicableCategories.some((c) => selectedCategories.has(c))
      if (!matched) {
        setStatus({
          state: 'invalid',
          error: `Voucher này chỉ áp dụng cho ${voucher.applicableCategories.join(', ')}`,
        })
        return
      }
    }
    const discountAmount = calcDiscount(voucher, baseAmount)
    setStatus({ state: 'valid', voucher, discountAmount })
  }, [inputCode, selectedCategories, baseAmount])

  const clearVoucher = useCallback(() => {
    setInputCode('')
    setStatus({ state: 'idle' })
  }, [])

  return { inputCode, setInputCode, status, applyVoucher, clearVoucher }
}
