import React from 'react';
import type { NextPage } from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import useSwr from 'swr';
import {search} from '@features/calculation';
import styles from './List.module.css'


const List: NextPage = () => {
  const router = useRouter()
  const handleCreate = React.useCallback(() => {
    router.push('/calculations/create')
  }, [router])
  const handleCreateTemplate = React.useCallback(() => {
    router.push('/calculations/create-template')
  }, [router])
  const calculations = useSwr('calculations', search);
  calculations.data
  return (
    <>
      <div className={styles.toolbar}>
        <input type="search" placeholder="search" />
        <button type="button" onClick={handleCreateTemplate}>Создать шаблон</button>
        <button type="button" onClick={handleCreate}>Создать расчет</button>
      </div>
      <div className={styles.grid}>
        {calculations.data?.map(item => <ListItem key={item.id} href={`/calculations/${item.id}`} title={item.title} totalCalculations={1000} createdAt={item.createdAt} />)}
      </div>
    </>
  )
}

interface ListItemProps {
  href: string,
  title: string
  totalCalculations: number
  createdAt: Date
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {href, title, totalCalculations, createdAt} = props
  return (
    <div className={styles.listItem}>
      <div className={styles.listItemHeader}><Link href={href}>{title}</Link></div>
      <div className={styles.listItemPrice}>{totalCalculations} Р</div>
      <div className={styles.listItemDate}>{formatDate(createdAt)}</div>
    </div>
  )
}

function formatDate(date: Date) {
  const yyyy = date.getFullYear()
  const mm = date.getMonth()
  const dd = date.getDate()
  return `${String(dd).padStart(2, '0')}.${String(mm).padStart(2, '0')}.${yyyy}`
}

export default List
