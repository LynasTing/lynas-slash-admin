import Table from 'antd/es/table';
import useLocale from '@/locales/use-locale';
import Button from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Text, Title } from '@/ui/typography';
import RoleModal from './role-modal';
import { useRolePage } from './use-role-page';

const ROLE_PAGE_I18N_PREFIX = 'pages.management.system.role';

/**
 * 角色管理页面。
 *
 * Role management page.
 */
export default function RolePage() {
  const { t } = useLocale();
  const {
    roleTableData,
    menuTreeData,
    tableLoading,
    confirmLoading,
    deletingRole,
    roleModalState,
    columns,
    handleCreate,
    handleCancel,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleSave
  } = useRolePage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Title as="h3">{t(`${ROLE_PAGE_I18N_PREFIX}.title`)}</Title>
            <Text color="secondary">{t(`${ROLE_PAGE_I18N_PREFIX}.description`)}</Text>
          </div>
          <Button onClick={handleCreate}>{t(`${ROLE_PAGE_I18N_PREFIX}.actions.new`)}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table rowKey="id" size="small" columns={columns} dataSource={roleTableData} loading={tableLoading} pagination={false} />
      </CardContent>
      <RoleModal
        visible={roleModalState.visible}
        type={roleModalState.type}
        formValue={roleModalState.formValue}
        menuTreeData={menuTreeData}
        confirmLoading={confirmLoading}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <Dialog open={!!deletingRole} onOpenChange={open => !open && handleDeleteCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(`${ROLE_PAGE_I18N_PREFIX}.deleteDialog.title`)}</DialogTitle>
            <DialogDescription>
              {deletingRole ? t(`${ROLE_PAGE_I18N_PREFIX}.deleteDialog.description`, { name: deletingRole.name }) : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleDeleteCancel}>
              {t(`${ROLE_PAGE_I18N_PREFIX}.actions.cancel`)}
            </Button>
            <Button type="button" variant="destructive" onClick={() => void handleDeleteConfirm()}>
              {t(`${ROLE_PAGE_I18N_PREFIX}.actions.confirmDelete`)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
