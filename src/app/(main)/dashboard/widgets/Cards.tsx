import React from 'react'
import DashboardCard from '../ui/Card'

const Cards = () => {
  return (
    <div className="flex gap-10 flex-wrap">
      <DashboardCard
        title="Families"
        firstValue={100}
        secondValue={32}
        firstColor={"#F7DACB"}
        secondColor={"#87BCCC"}
        firstTitle="active"
        secondTitle="inactive"
      />
      <DashboardCard
        title="Tasks"
        firstValue={23}
        secondValue={108}
        firstColor={"#EEA884"}
        secondColor={"#8671A2"}
        firstTitle="opened"
        secondTitle="closed"
      />
      <DashboardCard
        title="Supporters"
        firstValue={100}
        secondValue={32}
        firstColor={"#DCE5FF"}
        secondColor={"#B4407F"}
        firstTitle="active"
        secondTitle="inactive"
      />
    </div>
  )
}

export default Cards