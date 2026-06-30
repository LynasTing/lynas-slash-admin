import Table from 'antd/es/table';
import Button from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Text, Title } from '@/ui/typography';
import RoleModal from './role-modal';
import { useRolePage } from './use-role-page';

/**
 * 角色管理页面。
 *
 * Role management page.
 */
export default function RolePage() {
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
            <Title as="h3">Role List</Title>
            <Text color="secondary">Manage role metadata and authorized menus in one place.</Text>
          </div>
          <Button onClick={handleCreate}>New Role</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table rowKey="id" size="small" columns={columns} dataSource={roleTableData} loading={tableLoading} pagination={false} />
      </CardContent>
      <RoleModal
        visible={roleModalState.visible}
        title={roleModalState.title}
        formValue={roleModalState.formValue}
        menuTreeData={menuTreeData}
        confirmLoading={confirmLoading}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <Dialog open={!!deletingRole} onOpenChange={open => !open && handleDeleteCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              {deletingRole ? `This will permanently delete the role "${deletingRole.name}". This action cannot be undone.` : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => void handleDeleteConfirm()}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
