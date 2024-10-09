import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRecoilState } from 'recoil';
import { uiState } from '@/state/ui';


export const CommonPage = () => {
  const [uiStateValue, setUiState] = useRecoilState(uiState)
  const { isCreateTemplateDialogOpen } = uiStateValue
  const handleChangeDialog = (value: boolean) => {
    setUiState({
      ...uiStateValue,
      isCreateTemplateDialogOpen: value
    })
  }
  return (
    <>
      <Dialog open={isCreateTemplateDialogOpen} onOpenChange={handleChangeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Let's create a new template</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
