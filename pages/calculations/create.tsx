import React from 'react';
import type { NextPage } from 'next'

const CreateCalculation: NextPage = () => {
  return (
    <form method="POST" action="" noValidate autoComplete="off">
      <h3>Расчет</h3>
      <div>
        <input type="text" name="templateId" placeholder="Шаблон" />
      </div>
      <input type="submit" value="Посчитать" />
    </form>
  );
}

export default CreateCalculation
