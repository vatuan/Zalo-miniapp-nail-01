import React, { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'

type PageHeaderConfig = {
  content: ReactNode
}

type PageLayoutContextValue = {
  headerConfig: PageHeaderConfig | null
  setHeaderConfig: (config: PageHeaderConfig | null) => void
  mainContentRef: React.RefObject<HTMLDivElement>
}

const PageLayoutContext = createContext<PageLayoutContextValue | undefined>(undefined)

type PageLayoutProviderProps = {
  children: ReactNode
}

export function PageLayoutProvider({ children }: PageLayoutProviderProps) {
  const [headerConfig, setHeaderConfig] = useState<PageHeaderConfig | null>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  const value = useMemo(
    () => ({
      headerConfig,
      setHeaderConfig,
      mainContentRef,
    }),
    [headerConfig],
  )

  return <PageLayoutContext.Provider value={value}>{children}</PageLayoutContext.Provider>
}

function usePageLayoutContext() {
  const context = useContext(PageLayoutContext)

  if (!context) {
    throw new Error('usePageLayoutContext must be used within PageLayoutProvider')
  }

  return context
}

export function useConfigurePageHeader(config: PageHeaderConfig | null) {
  const { setHeaderConfig } = usePageLayoutContext()

  useEffect(() => {
    setHeaderConfig(config)

    return () => {
      setHeaderConfig(null)
    }
  }, [config, setHeaderConfig])
}

export function useMainContentRef() {
  const { mainContentRef } = usePageLayoutContext()

  return mainContentRef
}

export function usePageHeaderState() {
  const { headerConfig } = usePageLayoutContext()

  return headerConfig
}
