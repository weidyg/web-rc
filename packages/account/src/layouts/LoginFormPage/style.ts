import { generatStyles } from "@web-react/biz-provider";

const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: token.colorBgLayout,
      '&-bgVideo': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        'video': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }
      },
      '&-container': {
        zIndex: 99,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
      '&-ad': {

        backgroundColor: token.colorWarning,
      },
      '&-loginbox': {

      },
      '&-footer': {
        zIndex: 199,
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        backdropFilter: 'blur(10px)',
        backgroundColor: token.colorBgBlur,
        color: token.colorTextSecondary,
        '&-nav': {
          margin: '8px 0 0',
          lineHeight: '24px',
          textAlign: 'center',
          'a': {
            color: 'inherit',
            textDecoration: 'none',
            padding: '0 8px',
          },
        },
      },
      '&-copyright': {
        lineHeight: '24px',
        color: 'inherit',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: '12px',
        'a': {
          color: 'inherit',
          paddingLeft: '8px',
          textDecoration: 'none',
        },
        '&-beian': {
          width: '20px',
          height: '20px',
          marginRight: '4px',
          display: 'inline-block',
          verticalAlign: 'sub',
          backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAABQhJREFUOE991GtQVAUUB/D/vfu6e3fZF7ssKgguIrCKwCjGTAiiIhqGWmGiNiaNQ5mapU6jkmEZPibMppDMfPTBxyRjmviIfBAKkjkCKgIujwUXBdzltdy9+7rcpi2Z6HU+nZkz/9+cL+cQ+J/i+dZAR3NdxrVLt1a5WK84OS32oH903BmCCLf8V4z4twHPlqU8LL38ZuXFxgyeNVGPXDQEahVCtBRYK+1NnGk4F/XiS4cJKrbk7/l/gDzPU1c/X8FuzW/Eshd4xMk4jGP6IFHT6E9NRLWVxt71lfhwcwjmbDxBEQTh+is6AuR5W5CruuDY4py6pFmpNLLJaph3mcHHB0Kio8GU1CP6UCpO69Jxakc5vjuaeI6IWLiYIMY5n6HDoIs3R3WW7KrJzOkQRyaPwuH4Sjz4ogcCDMEtI0GPUcBR04UBxo2kHzKx5vx41J8tw8kj054QuoAUXeT6xt/RYZBnCuMLi8y31myU40RBA+bVVsByzAZyshbocsIz4IZgkj+YqhYYVkTg7rJMzJrTh4J8Kda+Io0TT8irGQZttdeClD2FJ/bfMSaue9+F87lViK5sBVvaCS5EDWIsDZAAb3bC1fYEVFIoiL2vIjLeidzNND7e5HcN1Oo3CKmq1bdh7feb3pnA3NhXzKTjtRw3Sg48xMyuFtRvq4Y3Kxyy6f5QGrXg7jjQv/M6gpYbYV40HVOSOBTu02H1rHuwyZbt0BoWfOADm0rzv/JrPp3TpJ+L55fqsG5pLT7NbkfZbjPk/S4ojToI/SiQTg7eYCUilwRjy0ccdn4zChVXFIix/4g+1YKjQTPeXekDG0+u7SBbfh0dMPs5TNwYic6bD3Ax7SfETNPhaaUNDoaF3KCBt80OdYwKvQ4JEr41Qm40wHSyFz1XfgZGRzeFLvo63AeairMZ++0GOm66Ehtq0rF3awcuoAhpE914mBCOnl4GqjB/aPwoBJyqQ/k9DinIwlvbxmN/WgXul3dDFT+pLXh2UagPtFzIO+vqKs8IiTagvi8M0SskmN9xCqsUdfCnvSCVUogBKMYHYMAuxKEbUhQpZuPW8SHEBbHoNHdAOiZuv3bK1rf/BLffdJrKEsSBAQiOUuKTK1OQu6kF4HoB3oMMhQ0aFYnidj8MggagxntbaBS8bsJjEzDE2ECNjanQJexM9IGdlbmevoYmIW/3QE52Q5kQCwsjw9WLFjSQkzHX2IRRUis+OzcB7l4WwZH+2DLfDE+LCXYPBUorhtw41aaO2K71ga7BX5Zaq3YfYzvdcFk9gKUNYQtjIdFTAGcDZxNisJuFcpwGCPEHLFa0nmkE66eF3CCHNJCGOjwrWaROLx++FO9gzXLb/YIvOadTab3eCaGMR2ByFLgeFh4HA5KmQGlkIMQi2Cqb4eWEUE4Ng8cJmypixhK5/uXLI06v11yVMlBz5DilZwIxJALXz0BEE4BIjCGvEGIp4LGzYCy9kOg1oIL0cPU5wDyyW1XTUrO0YdkjwcHWPaUCQXcq6yAw2NINkvNARANuuwNilRJg7WDa+kHKpRDrFABJQqyRQ6KnAVFosZ9+XebI5/D4Nv3Ufmm3+1HdSiHnkNEqCbyMGx67BwJK6OsFGgUElABudhCkTAuBdmw7SRsOqvQt+QSRNzQCfPbPGg9s0A48fTLP6bUkj4nSGrkBXk6pSY1IKoVjgG+XBmgcQq2xxtZsvRxxlysl8v6AntVvbnIRMylH8y8AAAAASUVORK5CYII=)`,
          backgroundSize: '100% 100%',
        }
      },
      [`@media (max-width: ${token.screenMDMin}px)`]: {
        '&-loginbox': {
          width: '100%',
          height: '100%',
          paddingBlock: 0,
        },
        ['&-footer,&-ad']: {
          display: 'none',
        },
      },
    },
  };
}, 'LoginFormPage')
export default useStyles;