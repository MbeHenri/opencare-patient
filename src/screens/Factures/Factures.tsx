import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

function Factures() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [O3ID, setO3ID] = useState("");

    useEffect(() => {
        async function fetchData() {
          if (user) setO3ID(user.uuid);
        }
        fetchData();
      }, [user]);
    
    if (!user)
    return (
        <div className="container-fluid">
        <h6>{t("no-authorized")}</h6>
        </div>
    );

  return (
    <div>
        <div className='table-responsive'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{t("invoices-table-th1")}</th>
                        <th>{t("invoices-table-th2")}</th>
                        <th>{t("invoices-table-th3")}</th>
                        <th>{t("invoices-table-th4")}</th>
                        <th>{t("invoices-table-th5")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Factures